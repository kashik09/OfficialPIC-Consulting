# PHP JSON backend (simple)

Run with PHP built-in server (recommended for local testing):

cd /home/kashi-kweyu/OfficialPIC-Consulting
php -S localhost:8000 -t php-backend

Endpoints
- GET  /api/submissions           -> list submissions
- POST /api/submissions           -> create submission (JSON body: name, email, message)
- GET  /api/submissions/{id}      -> get single submission
- PUT  /api/submissions/{id}      -> update submission (JSON body with fields)
- DELETE /api/submissions/{id}    -> delete submission

Notes
- db.json lives under php-backend/db.json. Make sure webserver process has write permission.
- For Apache, enable .htaccess by allowing overrides or set VirtualHost to php-backend.
- This is a lightweight dev backend — not production hardened. Add authentication and validation for production.
