import os
from waitress import serve
from app import app  # Ensure this matches your Flask app file

port = int(os.environ.get("PORT", 8000))
serve(app, host="0.0.0.0", port=port)