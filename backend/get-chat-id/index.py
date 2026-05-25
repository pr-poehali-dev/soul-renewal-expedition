import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Получить последние updates от бота — для определения Chat ID"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'},
            'body': ''
        }

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    url = f"https://api.telegram.org/bot{bot_token}/getUpdates"
    req = urllib.request.Request(url)
    response = urllib.request.urlopen(req, timeout=10)
    data = json.loads(response.read())

    chats = []
    for update in data.get('result', []):
        msg = update.get('message', {})
        chat = msg.get('chat', {})
        if chat:
            chats.append({
                'id': chat.get('id'),
                'name': chat.get('first_name', '') + ' ' + chat.get('last_name', ''),
                'username': chat.get('username', '')
            })

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'updates': chats}, ensure_ascii=False)
    }
