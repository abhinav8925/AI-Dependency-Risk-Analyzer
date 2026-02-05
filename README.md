# 🛡️ AI-Powered Dependency Risk Analyzer

> **A production-grade software supply chain security analyzer with AI explanations and deterministic fallback logic**

---

## 📌 Overview

**AI-Powered Dependency Risk Analyzer** is a backend system that analyzes a project’s `package.json` to identify **security, vulnerability, and policy risks** in third-party dependencies.

The system combines:

- **Rule-based deterministic security analysis**
- **AI-generated security explanations (via LLMs)**
- **Graceful fallback mechanisms** to ensure reliability when AI is slow or unavailable

This project is designed with **real-world production constraints** in mind — latency, reliability, and failure handling are first-class citizens.

---

## 🚀 Key Features

### ✅ Static Dependency Risk Analysis
- Scans both `dependencies` and `devDependencies`
- Detects high-risk packages, vulnerable versions, and license issues

### ✅ Final Risk Decision Engine
- Produces **BLOCK / WARN / ALLOW** decisions
- Backed by explicit escalation and policy rules

### ✅ AI-Generated Security Explanations
- Uses a Large Language Model to explain **why** a decision was made
- Generates human-readable, security-focused summaries

### ✅ Rule-Based Fallback (Production Safe)
- Automatically falls back when AI is slow or unavailable
- **Guarantees zero request failures**

### ✅ Demo Mode for AI Evaluation
- Optional `demo` mode with extended AI timeouts
- Useful for interviews and live demonstrations

### ✅ Dockerized Backend
- Fully containerized Node.js backend
- Environment-driven configuration

---

## 🧠 Why This Project Is Different

Most “AI projects” **break when the AI fails**.

**This one doesn’t.**

### ✔ Real-World Engineering Decisions
- AI calls are **time-bounded**
- Fallback logic is **explicit and guaranteed**
- System always returns a valid response
- No request ever hangs indefinitely

> This is how AI systems are built in production — not demos.

---

## 🏗️ Architecture (High Level)

Client (Postman / Frontend) | v Node.js API (Express) | +--> Rule-Based Analysis Engine | +--> AI Explanation Engine (LLM) | +--> Timeout / Fallback Handler
