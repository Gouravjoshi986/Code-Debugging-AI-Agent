# Project: Code Debugging AI Agent

Overview:
Developed a full-stack application using Flask (backend) and Next.js (frontend) to create an AI-powered debugging assistant. The system leverages HuggingFace's GPT models for code analysis and integrates with Pinecone for vector-based search functionality.

Backend Development:

1. Designed and implemented a REST API using Flask to handle requests for code analysis and debugging.
2. Integrated HuggingFace’s GPT model (GPT-Neo 2.7B) to automatically analyze and generate suggestions for debugging input code.
3. Set up a Pinecone vector database for indexing code snippets and embeddings, enabling efficient retrieval of similar code fragments for enhanced debugging suggestions.
4. Utilized HuggingFaceEmbeddings to convert code inputs into high-dimensional embeddings for semantic search in Pinecone.
5. Integrated Flask-CORS for handling cross-origin resource sharing, allowing smooth communication between the frontend and backend.

Frontend Development:

1. Developed the frontend using Next.js with TypeScript, enabling users to input code and receive real-time debugging feedback.
2. Set up Axios to send HTTP requests to the backend, ensuring proper data transmission for code debugging.
3. Managed state using React’s useState and useEffect hooks to handle form inputs and responses from the backend.
4. Utilized Tailwind CSS for styling, providing a modern and responsive user interface.

Natural Language Processing (NLP) and AI Integration:

1. Incorporated HuggingFace API to interact with pre-trained models for natural language understanding and code-related queries.
2. Implemented an AI agent that not only debugs code but also suggests improvements, provides explanations, and answers user questions about coding errors.

Database Integration:

1. Pinecone was used as the vector database to store code embeddings for semantic search, improving code suggestion quality.
2. Indexed user-submitted code and generated embeddings to store in Pinecone, enabling real-time, accurate search results for debugging purposes.

Deployment:

1. Containerized both frontend and backend using Docker, ensuring that the application runs consistently across different environments.
2. Used Docker Compose for orchestration, enabling easy communication between the backend and frontend services.
3. Deployed locally for development and testing with plans to deploy it on cloud platforms (AWS, Azure, or GCP) for production use.

Security and Authentication:

1. Integrated API tokens for secure communication with external services (HuggingFace API) to prevent misuse and unauthorized access.
2. Ensured sensitive data such as API keys and tokens were securely stored using environment variables and .env files.

Testing and Optimization:

1. Conducted thorough testing of both the frontend and backend to ensure accurate code debugging results and error-free communication.
2. Optimized the integration between the HuggingFace model, Pinecone vector store, and Flask API for minimal latency and better performance.

Challenges Overcome:

1. Addressed issues with handling large code snippets by improving the model’s response time through batching and embedding indexing.
2. Managed token-based rate limits for HuggingFace API calls by integrating efficient error handling and retry mechanisms.

Key Technologies Used:

* Backend: Flask, Pinecone, HuggingFace API, Python, Docker
* Frontend: Next.js, TypeScript, Tailwind CSS, Axios
* Cloud & Databases: Pinecone, HuggingFace, Docker Compose
* Tools & Libraries: CORS, .env configuration, Git, Postman

