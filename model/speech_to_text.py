from transformers import Speech2TextProcessor, Speech2TextForConditionalGeneration
import torchaudio
import librosa


def init_model_and_processor():
    model = Speech2TextForConditionalGeneration.from_pretrained("facebook/s2t-large-librispeech-asr")
    processor = Speech2TextProcessor.from_pretrained("facebook/s2t-large-librispeech-asr")
    return model, processor


def resample_audio(audio_file_path, target_sr=16000):
    waveform, sample_rate = librosa.load(audio_file_path, sr=target_sr)
    return waveform, sample_rate


def convert_to_text(audio_file_path, model, processor):
    waveform, sample_rate = resample_audio(audio_file_path)

    # Process the audio
    inputs = processor(waveform, sampling_rate=sample_rate, return_tensors="pt")

    # Generate the transcription
    generated_ids = model.generate(
        inputs["input_features"],
        attention_mask=inputs["attention_mask"],
    )

    # Decode the generated transcription
    return processor.batch_decode(generated_ids, skip_special_tokens=True)


def main():
    model, processor = init_model_and_processor()

    audio_file_path = 'audio/audio.wav'
    text = convert_to_text(audio_file_path, model, processor)
    print(text)


if __name__ == "__main__":
    main()
