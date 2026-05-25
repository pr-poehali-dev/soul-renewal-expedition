import json
import os
import psycopg2
import psycopg2.extras


def handler(event: dict, context) -> dict:
    """Получить список всех заявок для админки"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
            },
            'body': ''
        }

    password = (event.get('queryStringParameters') or {}).get('pwd', '')
    admin_password = os.environ.get('ADMIN_PASSWORD', 'alena2011')

    if password != admin_password:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный пароль'})
        }

    db_url = os.environ['DATABASE_URL']
    if '?' in db_url:
        db_url += '&options=-csearch_path=t_p9722231_soul_renewal_expedit'
    else:
        db_url += '?options=-csearch_path=t_p9722231_soul_renewal_expedit'
    conn = psycopg2.connect(db_url)
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT id, name, phone, expedition, message, departure_date, from_moscow, city, created_at FROM clients ORDER BY created_at DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    bookings = []
    for row in rows:
        bookings.append({
            'id': row['id'],
            'name': row['name'],
            'phone': row['phone'],
            'expedition': row['expedition'],
            'message': row['message'] or '',
            'departure_date': row['departure_date'] or '',
            'from_moscow': row['from_moscow'],
            'city': row['city'] or '',
            'created_at': row['created_at'].strftime('%d.%m.%Y %H:%M') if row['created_at'] else ''
        })

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'bookings': bookings}, ensure_ascii=False)
    }