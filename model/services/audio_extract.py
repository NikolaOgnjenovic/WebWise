from moviepy.editor import VideoFileClip
import re
import librosa
import soundfile as sf
import os
from constants import AUDIO_PATH


def get_filename(text):
    pattern = r'^(.*)\.'  # Matches any character (.) zero or more times (*) until the last dot (\.)
    match = re.match(pattern, text)
    if match:
        return match.group(1)
    else:
        return None


def resample_audio(audio_file_path, target_sr=16000):
    waveform, sample_rate = librosa.load(audio_file_path, sr=target_sr)
    sf.write(audio_file_path, waveform, sample_rate)


def video_to_audio(video_path: str, audio_path: str):
    video_clip = VideoFileClip(video_path)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(audio_path)
    audio_clip.close()
    video_clip.close()
    resample_audio(audio_path)
    return audio_path


def to_audio(video_path: str):
    print(video_path)
    print(get_filename(video_path))
    return video_to_audio(video_path, os.path.join(AUDIO_PATH, os.path.basename(video_path)+".wav"))
