"""
Flask backend for Muhammad Abubakar's portfolio site.

Provides:
  - POST /api/contact   accepts contact-form submissions, validates them,
                         stores them in a local SQLite database, and
                         (optionally) emails a notification.
  - GET  /api/health     simple health check.

Run locally:
  pip install -r requirements.txt
  python app.py
"""

import os
import re
import sqlite3
import smtplib
from datetime import datetime, timezone
from email.mime.text import MIMEText

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow the Vite dev server / deployed frontend origin to call this API.
ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS", "http://localhost:5173"
).split(",")
CORS(app, origins=ALLOWED_ORIGINS)

DB_PATH = os.environ.get("DB_PATH", os.path.join(os.path.dirname(__file__), "messages.db"))

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


def save_message(name: str, email: str, message: str) -> int:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.execute(
        "INSERT INTO messages (name, email, message, created_at) VALUES (?, ?, ?, ?)",
        (name, email, message, datetime.now(timezone.utc).isoformat()),
    )
    conn.commit()
    row_id = cur.lastrowid
    conn.close()
    return row_id


def maybe_send_email_notification(name: str, email: str, message: str) -> None:
    """
    Optional: forwards a notification email using SMTP credentials from
    environment variables. Silently does nothing if they aren't configured,
    so the API still works out of the box without a mail account.
    """
    host = os.environ.get("SMTP_HOST")
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASSWORD")
    to_addr = os.environ.get("CONTACT_TO_EMAIL", "bscs1495@gmail.com")

    if not (host and user and password):
        return

    port = int(os.environ.get("SMTP_PORT", "587"))
    body = f"New portfolio contact message\n\nFrom: {name} <{email}>\n\n{message}"
    msg = MIMEText(body)
    msg["Subject"] = f"Portfolio contact: {name}"
    msg["From"] = user
    msg["To"] = to_addr

    with smtplib.SMTP(host, port) as server:
        server.starttls()
        server.login(user, password)
        server.sendmail(user, [to_addr], msg.as_string())


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/api/contact")
def contact():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify({"error": "Name, email, and message are all required."}), 400
    if len(name) > 120 or len(email) > 120:
        return jsonify({"error": "Name or email is too long."}), 400
    if len(message) > 4000:
        return jsonify({"error": "Message is too long (4000 characters max)."}), 400
    if not EMAIL_RE.match(email):
        return jsonify({"error": "That email address doesn't look valid."}), 400

    try:
        row_id = save_message(name, email, message)
    except sqlite3.Error:
        return jsonify({"error": "Could not save your message. Please try again."}), 500

    try:
        maybe_send_email_notification(name, email, message)
    except Exception:
        # Don't fail the request just because the optional email step failed;
        # the message is already safely stored.
        pass

    return jsonify({"status": "ok", "id": row_id}), 201


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=int(os.environ.get("PORT", 5000)))
