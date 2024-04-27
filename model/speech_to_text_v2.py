import speech_recognition as sr


def convert_to_text(audio_file_path):
    recognizer = sr.Recognizer() 
    audio = sr.AudioFile(audio_file_path)
    try:
        with audio as source:
            recognizer.adjust_for_ambient_noise(source, duration=0.2)
            audio2 = recognizer.listen(source)
            
            text = recognizer.recognize_google(audio2)
            text = text.lower()

            return text 
    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))
    except sr.UnknownValueError:
        print("unknown error occurred")
