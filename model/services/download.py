from huggingface_hub import hf_hub_download
from constants import MODEL_NAME, MODEL_BASENAME, MODELS_PATH

if __name__ == "__main__":
    model_path = hf_hub_download(repo_id=MODEL_NAME, filename=MODEL_BASENAME, local_dir=MODELS_PATH)
    # model_path = hf_hub_download(repo_id=MODEL_NAME, filename=MODEL_BASENAME)
    print(model_path)