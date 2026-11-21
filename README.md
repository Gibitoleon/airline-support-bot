# Airline Support Assistant

## Overview

The Airline Support Assistant is an AI-powered application developed to support airline customers and staff by providing context-aware responses to enquiries about airline policies, procedures and flight operations.

The system combines **Retrieval-Augmented Generation (RAG)** with an agent-based architecture. An Agent Orchestrator determines how each request should be handled by selecting between direct conversational responses, knowledge-base retrieval and flight-related API tools.

For knowledge-based enquiries, the system retrieves relevant information from a curated airline knowledge base before generating responses. For flight-related enquiries, it uses external flight data services to retrieve operational information. Role-based access controls ensure that users can only retrieve information they are authorised to access.

**Live Application:** https://airline-support-frontend.onrender.com/

## Objectives

The project aims to:

- Develop an intelligent assistant for airline customer and staff support.
- Implement an agent-driven architecture for handling different types of user enquiries.
- Develop a RAG pipeline for retrieving relevant information from airline knowledge sources.
- Improve response reliability by grounding generated answers in retrieved information.
- Integrate external flight data APIs for flight searches, schedules and status enquiries.
- Implement role-based access control for customer, staff and knowledge base administrator accounts.
- Explore the practical application of Large Language Models and agent-based systems in airline support services.

## Key Features

- **Agent Orchestration:** Determines whether a request requires a direct response, knowledge-base retrieval or flight-related API operations.
- **Knowledge Base Retrieval:** Retrieves relevant document chunks using semantic similarity search.
- **Document Reranking:** Reorders retrieved chunks based on their relevance to the user's query.
- **Flight Search:** Retrieves flight options using an external flight data API.
- **Flight Schedules:** Provides flight schedule information.
- **Flight Status:** Retrieves operational flight status information.
- **Role-Based Access Control:** Applies user permissions when accessing restricted knowledge base content.
- **Conversational Interface:** Supports multi-turn conversations using conversation history.
- **Knowledge Base Management:** Allows authorised administrators to manage knowledge base content.
- **User Feedback:** Allows users to submit ratings on chatbot responses.

## Technology Stack

### Frontend

- React
- Tailwind CSS
- Axios

### Application Backend

- Node.js
- Express.js
- Sequelize ORM

### RAG Service

- Python
- Flask
- ChromaDB
- PyMuPDF4LLM

### AI and Machine Learning

- **LLM:** Groq – `openai/gpt-oss-120b`
- **Embedding Model:** Gemini Embedding 2
- **Reranking Model:** Jina Reranker v2 Base Multilingual

### External APIs

- OAG Flight Data API
- Google Gemini API
- Groq API
- Jina AI API

### Database and Storage

- Supabase PostgreSQL
- Redis
- ChromaDB

### DevOps and Deployment

- Docker
- Docker Compose
- Git
- GitHub
- GitHub Actions
- Render

## System Architecture

The local development application consists of five containerised services:

| Service             | Responsibility                                                           |
| ------------------- | ------------------------------------------------------------------------ |
| Frontend            | Provides the user interface.                                             |
| Application Backend | Handles API requests, authentication, permissions and application logic. |
| Email Worker        | Processes background email tasks.                                        |
| RAG Service         | Handles knowledge-base retrieval and response generation.                |
| RAG Worker          | Processes background knowledge-base ingestion and deletion tasks.        |

The frontend communicates with the application backend, which coordinates requests with the RAG service and external flight data APIs. Redis supports session management and background task processing, while Supabase PostgreSQL stores application data. ChromaDB stores the indexed document embeddings and associated metadata.

## Deployment

The application is publicly hosted on **Render**, with the frontend, application backend and RAG service deployed as separate Docker-based services.

The application uses Supabase PostgreSQL and cloud-hosted Redis for its external data and session management infrastructure.

**Access the deployed application:**

https://airline-support-frontend.onrender.com/

## Evaluation Access

The deployed application provides evaluation accounts for testing staff and knowledge base administration functionality.

| Role                         | Email                       |
| ---------------------------- | --------------------------- |
| Staff                        | `staff1.local@example.test` |
| Staff                        | `staff2.local@example.test` |
| Knowledge Base Administrator | `kba.local@example.test`    |

All three evaluation accounts share the same initial password, which is provided separately to authorised evaluators.

**Staff and Administrator Login Portal:**

https://airline-support-frontend.onrender.com/login

These accounts are intended for project evaluation purposes only.

## Local Development and Setup

The repository includes Dockerfiles, a Docker Compose configuration and automated setup scripts to simplify local deployment.

### Prerequisites

- Git
- Docker Engine
- Docker Compose

For Windows, Docker Desktop can be used to provide Docker Engine and Docker Compose.

Linux users require Docker Engine and the Docker Compose plugin, as well as `curl` and `unzip`.

### 1. Clone the Repository

```bash
git clone https://github.com/Gibitoleon/airline-support-bot.git
cd airline-support-bot
```

### 2. Configure Environment Variables

The repository provides `.env.example` templates in four locations:

- Project root
- `frontend/`
- `backend/application-backend/`
- `backend/rag-service/`

Obtain the required credentials for the external services, populate the respective templates and save them as `.env` files in their corresponding directories.

**Important:** Do not commit actual environment files or expose API keys, database credentials or other secrets in the repository.

### 3. Run the Deployment Script

The automated setup scripts handle the initial deployment process.

**Windows PowerShell:**

```powershell
.\scripts\setup.ps1
```

**Linux:**

```bash
bash scripts/setup.sh
```

The scripts:

1. Verify Docker prerequisites and required environment files.
2. Download the populated ChromaDB vector store from the project's GitHub Release.
3. Extract the vector store into the required directory.
4. Build the Docker images.
5. Execute the Sequelize database migrations.
6. Start the application services using Docker Compose.

### 4. Populate Initial Database Data

For a fresh database installation, run the following command after the deployment script has completed:

```bash
docker compose exec application-backend npx sequelize-cli db:seed:all
```

This populates the initial application data, including roles, groups, permissions and local test accounts.

### 5. Verify the Services

Check the running containers:

```bash
docker compose ps
```

Once the services are running, access the frontend at:

```text
http://localhost:5173
```

Submit a chatbot enquiry to verify that the application is communicating with the backend and RAG service.

## Project Status

**Implementation and deployment completed.**

The application has been implemented, containerised using Docker and Docker Compose, and publicly deployed on Render.

The system includes agent orchestration, knowledge-base retrieval, document reranking, flight API integration, authentication and role-based access control.

## Repository

GitHub: https://github.com/Gibitoleon/airline-support-bot
