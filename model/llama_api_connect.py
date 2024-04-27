import json
from llamaapi import LlamaAPI
from dotenv import load_dotenv
import os

load_dotenv()


def get_llama_api_response(api_request_json: dict):
    llama = LlamaAPI(os.getenv("LLAMA_API_KEY"))
    response = llama.run(api_request_json)
    return response.json()['choices'][0]['message']['content']