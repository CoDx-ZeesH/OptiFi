import os
import logging
import json

try:
    import firebase_admin
    from firebase_admin import credentials
except Exception:
    firebase_admin = None
SERVICE_ACCOUNT_PATH = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
# Allow providing the service account JSON directly via an env var for easier
# local development: FIREBASE_SERVICE_ACCOUNT_JSON contains the JSON content.
SERVICE_ACCOUNT_JSON = os.environ.get('FIREBASE_SERVICE_ACCOUNT_JSON')

if firebase_admin:
    try:
        if SERVICE_ACCOUNT_JSON:
            # Initialize from JSON string
            data = json.loads(SERVICE_ACCOUNT_JSON)
            cred = credentials.Certificate(data)
            firebase_admin.initialize_app(cred)
            logging.info('Initialized firebase-admin from JSON env var')
        elif SERVICE_ACCOUNT_PATH:
            cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
            firebase_admin.initialize_app(cred)
            logging.info(
                'Initialized firebase-admin from service account file')
        else:
            logging.info(
                'firebase-admin not initialized: no service account provided')
    except Exception as e:
        logging.warning('Failed to initialize firebase-admin: %s', e)
else:
    logging.info(
        'firebase-admin package not installed; skipping initialization')
