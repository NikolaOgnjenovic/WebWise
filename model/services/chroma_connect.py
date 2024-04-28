import chromadb
from langchain.schema import Document
from constants import NUM_OF_TOP_DOCUMENTS


def add_to_chroma(documents: list[Document], collection_name: str):
    try:
        client = chromadb.HttpClient(host='localhost', port=8000)
        collection = client.get_or_create_collection(collection_name)

        collection.add(
            documents=[doc.dict()['page_content'] for doc in documents],
            metadatas=[doc.dict()['metadata'] for doc in documents],
            ids=[str(doc.dict()['metadata']['start_index']) for doc in documents]
            )
        
        return True
    except:
        return False
    

def get_similar_documents(query: str, collection_name: str):
    client = chromadb.HttpClient(host='localhost', port=8000)
    collection = client.get_or_create_collection(collection_name)
    result = collection.query(
        query_texts=[query],
        n_results=NUM_OF_TOP_DOCUMENTS,
        include=["documents", 'distances',]
        )
    return result.get('documents')[0]
