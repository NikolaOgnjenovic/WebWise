FROM python:3.11.2-slim
WORKDIR /app
RUN apt-get update && apt-get install ffmpeg -y
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD python3 app.py
