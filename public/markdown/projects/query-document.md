# 🧠 HackRx Query System – Intelligent Document Processing & Policy Q&A Platform

**Role:** Document Processing Engineer | **Team Size:** 5 | **Competition:** HackRx

## 🔍 Project Overview

Developed an AI-powered document query and retrieval system for the HackRx competition, designed to make complex insurance policies easy to understand through natural language queries. The system combines document processing, vector search, reranking, and LLM reasoning to provide contextually accurate, clause-level answers from lengthy policy documents.

## ⚙️ Key Features

### 🧩 Hybrid Extraction Pipeline
Combined PyPDF2 for full-page coverage with Azure Document Intelligence for high-quality OCR on complex layouts.

### 🧠 Two-Stage Retrieval
Implemented FAISS vector search (15 candidates) followed by Cross-Encoder reranking, improving accuracy by **60%**.

### 🔍 Policy-Specific QA
Used Google Gemini AI with custom prompt engineering to deliver clause-based, JSON-formatted answers (answer, source, explanation).

### 🔒 Secure FastAPI Backend
Asynchronous API with Bearer Token authentication, Pydantic validation, and Dockerized deployment.

### 🧰 Multi-Provider Reliability
Integrated OpenAI + HuggingFace embeddings with automatic failover for **99.9% uptime**.

### ⚡ Optimized Performance
Achieved **100% document coverage** (16+ pages), **85% accuracy**, and **99% JSON parsing success**.

## 🧩 Architecture Highlights

### Workflow
```
Document Upload → Hybrid Extraction → Token-based Chunking → 
Embedding Generation → FAISS Search → Cross-Encoder Reranking → 
Gemini Answer Generation
```

### Core Modules

- **document_loader.py** – Hybrid extraction (PyPDF2 + Azure fallback)
- **chunker.py** – Token-based semantic splitting (500 tokens + overlap)
- **embedder.py** – Multi-provider embeddings (OpenAI/HuggingFace)
- **vector_store.py** – FAISS IndexFlatL2 for semantic search
- **reranker.py** – Cross-Encoder reranking for contextual accuracy
- **answer_generator.py** – Gemini AI-based structured answer synthesis

## 🎯 My Contributions

- Designed and implemented the document processing pipeline — from extraction and chunking to embedding and FAISS indexing
- Developed fallback mechanisms for unreliable extraction or embedding providers
- Tuned retrieval pipeline parameters for optimal precision@5 and recall@5
- Built secure FastAPI endpoints with authentication and error handling

## Tech Stack

- **FastAPI** - Asynchronous web framework
- **FAISS** - Vector similarity search
- **Azure Document Intelligence** - OCR and document analysis
- **PyPDF2** - PDF text extraction
- **Google Gemini AI** - LLM reasoning and answer generation
- **HuggingFace Transformers** - Embeddings and reranking
- **Docker** - Containerization and deployment
- **Python** - Core programming language

## Results

- ✅ 100% document coverage on 16+ page policies
- ✅ 85% answer accuracy on test queries
- ✅ 99% JSON parsing success rate
- ✅ 60% improvement in retrieval accuracy with reranking
- ✅ 99.9% API uptime with failover mechanisms
