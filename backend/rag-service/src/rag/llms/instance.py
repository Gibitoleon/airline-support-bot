from .llama import LlamaManager

llama_manager = LlamaManager()
query = "Give me the benefits of working hard in school like 3 of them"
response = llama_manager.generate_response(query)
print(response)
