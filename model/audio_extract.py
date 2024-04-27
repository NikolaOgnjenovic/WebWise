from moviepy.editor import VideoFileClip
import re


def get_filename(text):
    pattern = r'^(.*)\.'  # Matches any character (.) zero or more times (*) until the last dot (\.)
    match = re.match(pattern, text)
    if match:
        return match.group(1)
    else:
        return None


def video_to_audio(video_path: str, audio_path: str):
    video_clip = VideoFileClip(video_path)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(audio_path)
    audio_clip.close()
    video_clip.close()


def to_audio(video_path: str):
    return video_to_audio(video_path, get_filename(video_path)+'.wav')


def main():
    mp4_file = "video/video.webm"
    mp3_file = "audio/audio.wav"

    video_to_audio(mp4_file, mp3_file)


if __name__ == "__main__":
    main()