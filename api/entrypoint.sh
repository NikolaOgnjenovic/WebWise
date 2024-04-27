#!/bin/bash

# Wait for database
echo "Waiting for PostgreSQL...\n" "info"
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOSTNAME" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
    echo >&2 "Postgres is unavailable - sleeping\n" "info"
    sleep 1
done

echo "Applying migrations..."
python3 manage.py migrate

echo "Starting Django server..."
python3 manage.py runserver 0.0.0.0:8001