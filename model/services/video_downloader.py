import os
import requests
from constants import VIDEO_PATH


def download_video(url: str, filename: str):
    filepath = os.path.join(VIDEO_PATH, filename)

    response = requests.get(url)
    if response.status_code == 200:
        # Define the directory where you want to save the video
        save_dir = "videos"
        os.makedirs(save_dir, exist_ok=True)  # Create the directory if it doesn't exist
        
        # Save the video to a file in the local directory
        with open(filepath, "wb") as f:
            f.write(response.content)
        
        return filepath
    
    return None