Code Debugging AI Agent
Overview
The Code Debugging AI Agent is a full-stack application that helps users debug their code using AI. The backend is built using Flask and integrates with HuggingFace’s GPT-Neo 2.7B model to analyze and debug code. The frontend is built with Next.js, providing a responsive and modern interface. The application also uses Pinecone for semantic search functionality, allowing for better debugging suggestions based on code embeddings.

Prerequisites
Before setting up the project, make sure you have the following tools installed:

Python 3.x
Node.js
Docker
Git
Pinecone account
HuggingFace account
Project Setup

1. Clone the Repository
Clone the repository to your local machine:

````bash
git clone https://github.com/your-username/code-debugging-ai-agent.git
cd code-debugging-ai-agent````

2. Backend Setup
Step 1: Create a Python Virtual Environment (Optional)
It is recommended to create a virtual environment to avoid conflicts with other Python projects:

````bash
python -m venv venv
source venv/bin/activate #On Mac
venv\Scripts\activate #On Windows
````

Step 2: Install Dependencies
Install the necessary Python packages listed in requirements.txt:

````bash
pip install -r requirements.txt````

Step 3: Set Up Environment Variables
Create a .env file in the root directory and add your Pinecone API key and HuggingFace API token:

````bash
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENV=your_pinecone_env
HF_API_TOKEN=your_huggingface_api_token````

Step 4: Start the Backend
Run the Flask backend server:

````bash
python app.py````

The backend will run locally at `http://localhost:5000`.

3. Frontend Setup
Step 1: Install Dependencies
Navigate to the frontend directory and install the required Node.js packages:

````bash
cd frontend
npm install````

Step 2: Start the Frontend
Run the Next.js frontend server:
`npm run dev`
The frontend will run locally at `http://localhost:3000`.

4. Docker Setup (Optional)
To run both the backend and frontend in Docker containers:

Step 1: Build the Docker Containers
From the root directory, run:
`docker-compose up --build`

This will build and start both the backend and frontend containers.

Step 2: Access the Application
Once Docker containers are up and running, you can access the application:

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

5. Testing the Application
You can test the debugging feature by sending a POST request to the backend at http://localhost:5000/debug with the following JSON payload:

````json
{
  "code": "your code snippet here"
}
````

6. Deployment
The application is containerized using Docker. You can deploy it to cloud platforms such as AWS, Azure, or Google Cloud by following the respective cloud provider's documentation for Docker deployments.

Key Technologies
Backend: Flask, Pinecone, HuggingFace API, Python
Frontend: Next.js, TypeScript, Tailwind CSS, Axios
Cloud & Databases: Pinecone, HuggingFace, Docker Compose
Tools & Libraries: CORS, .env configuration, Git, Postman
