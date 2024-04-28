from services.audio_extract import to_audio
from services.video_downloader import download_video
from services.audio_extract import to_audio
from services.speech_to_text_v2 import convert_to_text
from services.parse_file import get_chunks
from services.chroma_connect import add_to_chroma
from services.prompt import get_full_prompt_for_llama_api
from services.llama_api_connect import get_llama_api_response


def upload_video(video_id: str, url: str):
    video_path = download_video(url, video_id)
    if video_path == None:
        return
    
    audio_path = to_audio(video_path)
    if audio_path == None:
        return
    
    text = convert_to_text(audio_path)
    if text == None:
        return
    
    docs = get_chunks(text)
    if not add_to_chroma(docs, video_id):
        return


def send_prompt(video_id: str, chat_history: list[dict]) -> str:
    message = chat_history[-1]['content']
    prompt = get_full_prompt_for_llama_api(message, video_id, chat_history[:-1])
    return get_llama_api_response(prompt)