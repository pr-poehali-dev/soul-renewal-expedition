import json
import os
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2


def handler(event: dict, context) -> dict:
    """Отправка заявки на email и в Telegram, сохранение в БД"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '')
    phone = body.get('phone', '')
    expedition = body.get('expedition', '')
    message = body.get('message', '')
    departure_date = body.get('date', '')
    from_moscow = body.get('from_moscow', False)
    city = body.get('city', '')
    extra_services = body.get('extra_services', '')

    if not name or not phone or not expedition:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните обязательные поля'})
        }

    errors = []

    # --- Сохранение в БД ---
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO t_p9722231_soul_renewal_expedit.clients (name, phone, expedition, message, departure_date, from_moscow, extra_services, city) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (name, phone, expedition, message, departure_date, from_moscow, extra_services, city)
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        errors.append(f'DB: {str(e)}')

    # --- Telegram ---
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
        if bot_token and chat_id:
            moscow_note = " (из Москвы, +1 день)" if from_moscow else ""
            city_note = f"\n🏙 Город: {city}" if city else ""
            extra_note = f"\n✨ Доп. услуги: {extra_services}" if extra_services else ""
            text = (
                f"🏔 *Новая заявка на экспедицию*\n\n"
                f"👤 Имя: {name}\n"
                f"📞 Телефон: {phone}\n"
                f"🗺 Экспедиция: {expedition}\n"
                f"📅 Дата выезда: {departure_date or 'не указана'}{moscow_note}"
                f"{city_note}"
                f"{extra_note}\n"
                f"💬 Сообщение: {message or 'не указано'}"
            )
            tg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            tg_data = urllib.parse.urlencode({
                'chat_id': chat_id,
                'text': text,
                'parse_mode': 'Markdown'
            }).encode()
            req = urllib.request.Request(tg_url, data=tg_data, method='POST')
            urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        errors.append(f'Telegram: {str(e)}')

    # --- Email ---
    try:
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        email_from = 'a5144500@inbox.ru'
        email_to = 'a5144500@inbox.ru'

        if smtp_password:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Новая заявка: {expedition}'
            msg['From'] = email_from
            msg['To'] = email_to

            city_row = f"<tr><td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;'>Город</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{city}</td></tr>" if city else ""
            extra_row = f"<tr><td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;'>Доп. услуги</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{extra_services}</td></tr>" if extra_services else ""
            html = f"""
            <html><body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4a9db5;">🏔 Новая заявка на экспедицию</h2>
              <table style="width:100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Имя</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{name}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Телефон</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{phone}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Экспедиция</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{expedition}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Дата выезда</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{departure_date or 'не указана'}{'  (из Москвы, +1 день)' if from_moscow else ''}</td></tr>
                {city_row}
                {extra_row}
                <tr><td style="padding: 8px; font-weight: bold;">Сообщение</td><td style="padding: 8px;">{message or 'не указано'}</td></tr>
              </table>
            </body></html>
            """
            msg.attach(MIMEText(html, 'html', 'utf-8'))

            with smtplib.SMTP_SSL('smtp.inbox.ru', 465) as server:
                server.login(email_from, smtp_password)
                server.sendmail(email_from, email_to, msg.as_string())
    except Exception as e:
        errors.append(f'Email: {str(e)}')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'errors': errors})
    }