from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.llms import OpenAI
from pinecone import Pinecone
import os 
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Pinecone for vector database operations
pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))

@app.route('/')
def home():
    return "Welcome to the Debugging API!"

@app.route('/favicon.ico')
def favicon():
    return '', 204  # Return no content

@app.route('/debug', methods=['POST'])
def debug_code():
    data = request.get_json()
    print("Received data:", data)
    code = data.get('code', '')

    if not code.strip():
            return jsonify({"error": "No code provided. Please submit valid code for debugging."}), 400
            
    # LangChain Debugging Logic
    llm = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    prompt = PromptTemplate(input_variables=["code"], template="Debug this code : {code}")
    chain = LLMChain(llm=llm, prompt=prompt)

    # Run the chain with the provided code
    response = chain.run({"code": code})
    return jsonify({"debugged_code": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
