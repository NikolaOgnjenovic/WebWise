from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
import os, shutil
from constants import CHROMA_PATH

from chroma_connect import add_to_chroma
from speech_to_text_v2 import convert_to_text


def split_text(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=100,
        chunk_overlap=50,
        length_function=len,
        add_start_index=True,
    )
    return text_splitter.split_documents(documents)


def get_documents_from_text(text: str):
    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    docs = [Document(page_content=x) for x in text_splitter.split_text(text)]
    return docs


def clear_database():
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)


def main():
    text = convert_to_text("audio/audio.wav")
    docs = get_documents_from_text(text)
    chunks = split_text(docs)
    print(len(chunks))
    print(type(chunks[0]))
    print(chunks[0])
    add_to_chroma(chunks, 'test_collection')


if __name__ == "__main__":
    main()