import os

CHROMA_PATH='chroma'
MODELS_PATH = "models"
MODEL_NAME = "TheBloke/Llama-2-13B-chat-GGML"
MODEL_BASENAME = "llama-2-13b-chat.ggmlv3.q5_1.bin"
MODEL_PATH = os.path.join(MODELS_PATH, MODEL_BASENAME)

VIDEO_PATH="video"
AUDIO_PATH="audio"

NUM_OF_TOP_DOCUMENTS=5