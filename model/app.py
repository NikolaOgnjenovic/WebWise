from threading import Thread
from flask import Flask, request
from services import service_coordinator as sc


app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello world!"


@app.route('/video/<video_id>', methods=['POST'])
def upload_video(video_id: str):
    url = request.data.decode('utf-8')

    thread = Thread(target=sc.upload_video, kwargs={'video_id': video_id, 'url': url})
    thread.start()

    return "success"


@app.route('/message/<video_id>', methods=['POST'])
def send_prompt(video_id: str):
    chat_history = request.json['history']
    return sc.send_prompt(video_id, chat_history)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8002, debug=True)