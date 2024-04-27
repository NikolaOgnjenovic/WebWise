#!/bin/bash

echo "Applying migrations..."
python3 manage.py migrate

echo "Starting Django server..."
python3 manage.py runserver 0.0.0.0:8001