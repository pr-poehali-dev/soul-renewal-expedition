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
    admin_password = 'alena2011'

    if password != admin_password:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный пароль'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute("SELECT current_user, current_schema()")
    user_info = cur.fetchone()

    cur.execute("SELECT schema_name FROM information_schema.schemata")
    schemas = [r[0] for r in cur.fetchall()]

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'current_user': user_info[0], 'current_schema': user_info[1], 'schemas': schemas})
    }
