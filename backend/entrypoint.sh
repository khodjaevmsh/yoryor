#!/bin/bash
set -e

# Wait for the database to be ready
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 0.1
done

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn
# echo "Starting Gunicorn..."
# exec gunicorn --config gunicorn_config.py config.wsgi:application


# Start Daphne for WebSocket and HTTP handling
echo "Starting Daphne (ASGI server)..."
exec daphne -b 0.0.0.0 -p 8000 config.asgi:application
