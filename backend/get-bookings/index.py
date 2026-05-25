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
    cur.execute("SELECT current_user, session_user, current_schema()")
    row = cur.fetchone()
    cur.execute("SELECT has_schema_privilege(current_user, 't_p9722231_soul_renewal_expedit', 'USAGE')")
    priv = cur.fetchone()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'current_user': row[0], 'session_user': row[1], 'schema': row[2], 'has_priv': priv[0]})
    }