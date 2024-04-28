from typing import List, Tuple
from llama_cpp import Llama
from langchain.prompts import ChatPromptTemplate
from constants import MODEL_PATH
from services.chroma_connect import get_similar_documents
# from llama_api_connect import get_llama_api_response


def init_model():
    return Llama(
        model_path=MODEL_PATH,
        n_threads=2
    )


def get_reply(prompt: str, llm):
    return llm(prompt, max_tokens=1024, temperature=0.3, top_p=0.95,
                  repeat_penalty=1.2, top_k=150,
                  echo=False)


def get_full_prompt(user_prompt: str, collection_id, conversation_history: List[dict]) -> str:
    docs = get_similar_documents(user_prompt, collection_id)
    
    template = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful, respectful and honest assistant. Based on the following information, you should answer a user prompt."),
        ("placeholder", "{rag}"),
        ("placeholder", "{conversation}"),
        ("system", "Answer the following user prompt:"),
        ("human", user_prompt),
        ("ai", "")
    ])

    prompt_value =  template.invoke({
        "rag": [("system", doc) for doc in docs],
        "conversation": [(message['role'], message['content']) for message in conversation_history],
    })
    
    return prompt_value.to_string()
    

def get_full_prompt_for_llama_api(user_prompt: str, collection_id, conversation_history: List[dict]):
    docs = get_similar_documents(user_prompt, collection_id)
    return {
        "messages": [
            {"role": "user", "content": get_full_prompt(user_prompt, collection_id, conversation_history)}
        ]
    }
    # return {
    #     "messages": [
    #         {"role": "system", "content": "You are a helpful, respectful and honest assistant. Based on the following information, you should answer a user prompt."}
    #     ] + [
    #         {"role": "system", "content": doc} for doc in docs
    #     ] + conversation_history + [
    #         {"role": "system", "content": "Answer the following user prompt:"},
    #         {"role": "human", "content": user_prompt}
    #     ]
    # }


# def main():
#     llm = init_model()
#     prompt = "How to add 404 page to react router?"

#     # prompt = get_full_prompt(prompt, 'test_collection', [])
#     # print(get_reply(prompt, llm))
#     # print(prompt)

#     prompt = get_full_prompt_for_llama_api(prompt, 'test_collection', [])
#     print(prompt)
#     response = get_llama_api_response(prompt)
#     print(response)


# if __name__ == "__main__":
#     main()