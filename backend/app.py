import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from langchain_huggingface import HuggingFaceEndpoint
from langchain_community.vectorstores import Pinecone
from langchain_huggingface import HuggingFaceEmbeddings
import pinecone
from pinecone import Pinecone, ServerlessSpec
from flask_cors import CORS  # Add CORS support

app = Flask(__name__)
load_dotenv()

# Enable CORS to allow cross-origin requests from the frontend
CORS(app)

def setup_pinecone():
    # Initialize Pinecone client
    pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
    
    index_name = "codedebuggingagent"
    dimension = 768  # Replace with your model's embedding dimension
    
    # Check if the index already exists, if not, create it
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=dimension,
            metric="cosine",  # Use cosine metric for vector similarity
            spec=ServerlessSpec(
                cloud="aws",  # Optional: Cloud provider (default is AWS)
                region="us-east-1"  # Optional: Region (default is us-east-1)
            )
        )
    
    host = os.environ.get("PINECONE_ENV")
    # Return the index object to interact with it
    return pinecone.Index(index_name, host=host)

# Create Pinecone index and store it in a variable
index = setup_pinecone()

# Set up LangChain components (HuggingFace Embeddings and Pinecone)
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Pinecone(index, embedding_function=embedding_model.embed_query)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Code Debugging AI Agent!"})

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')

import traceback

@app.route("/debug", methods=["POST"])
def debug_code():
    try:
        # Get the 'code' input from the JSON body
        code_input = request.json.get("code")
        
        if not code_input:
            return jsonify({"error": "Code input is required."}), 400

        # 1. Retrieve the most relevant code snippets from Pinecone
        query_vector = embedding_model.embed_query(code_input)
        retrieval_results = vectorstore.similarity_search_by_vector(query_vector, top_k=3)  # Retrieve top 3 most relevant code snippets

        # 2. Combine retrieved code snippets with the input code
        context = "\n".join([result['text'] for result in retrieval_results['matches']])

        # 3. Create a prompt for the HuggingFace model (including the context and user code)
        prompt = f"Given the following code snippets and the user's code, debug the code:\n\nContext:\n{context}\n\nUser Code:\n{code_input}"

        # 4. Send the prompt to HuggingFace model for generation
        llm = HuggingFaceEndpoint(repo_id="EleutherAI/gpt-neo-2.7B", token=os.environ.get("HF_API_TOKEN"))
        response = llm.invoke(prompt)  # Generate response from model

        # 5. Return the response to the frontend
        return jsonify({"debuggedCode": response})

    except Exception as e:
        # Log the exception traceback to understand the error better
        print(f"Error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
