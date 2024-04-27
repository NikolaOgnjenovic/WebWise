from moviepy.editor import VideoFileClip
import re
import librosa
import soundfile as sf


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


def to_audio(video_path: str):
    return video_to_audio(video_path, get_filename(video_path)+'.wav')


def main():
    mp4_file = "video/video.webm"
    mp3_file = "audio/audio.wav"

    video_to_audio(mp4_file, mp3_file)
    # resample_audio(mp3_file)


if __name__ == "__main__":
    main()