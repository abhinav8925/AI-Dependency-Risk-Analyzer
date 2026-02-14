# 🛡️ AI-Powered Dependency Risk Analyzer

### Production-Grade Software Supply Chain Security Analyzer with AI Explanations & Deterministic Fallback

---

## 🌐 🚀 Live Demo

👉 Public API URL:

https://ai-dependency-risk-analyzer.onrender.com

---

## ⚡ How To Use The Live API (Simple Steps)

### STEP 1 — Upload a package.json

POST request:

```
/analyze
```

In Postman:

• Method → POST  
• Body → form-data  
• Key → file  
• Upload your package.json  

You will receive an **analysisId**.

---

### STEP 2 — Get Explanation

Use the returned analysisId:

```
POST /explain/{analysisId}
```

---

## 🤖 Important Note About AI Mode

Because the live deployment runs on free cloud infrastructure:

| Environment | AI Explanation |
|-------------|----------------|
| 🌐 Live API (Render) | Rule-based fallback only |
| 💻 Local Machine | Full AI explanation |

Cloud providers cannot run local LLM models due to high memory requirements.

---

## 🧠 How To Run FULL AI Mode Locally

### 1️⃣ Install Ollama

Download from:

https://ollama.ai

---

### 2️⃣ Pull AI Model

```
ollama run llama3
```

---

### 3️⃣ Start Backend

```
npm install
npm run dev
```

---

### 4️⃣ Force AI Explanation

```
POST /explain/{analysisId}?mode=demo
```

This enables AI explanation mode.

---

## 📌 Project Overview

AI-Powered Dependency Risk Analyzer is a backend system that evaluates the security risk of third-party dependencies inside a project’s package.json.

The system combines:

• Rule-based deterministic security analysis  
• AI-generated security explanations  
• Guaranteed fallback reliability  

This ensures the system never fails even when AI is unavailable.

---

## 🚀 Key Features

### ✅ Static Dependency Risk Analysis

• Scans dependencies and devDependencies  
• Detects vulnerable packages  
• Flags license risks  
• Identifies blocked dependencies  

---

### ✅ Final Risk Decision Engine

Produces a clear decision:

BLOCK | WARN | ALLOW

Based on:

• Vulnerability severity  
• Policy rules  
• Dependency trust score  

---

### ✅ AI-Generated Security Explanations

• Converts technical risks into human-readable explanations  
• Explains why dependencies are unsafe  
• Uses local LLM integration  

---

### ✅ Deterministic Fallback System

If AI fails:

• System instantly switches to rule-based explanation  
• No request timeouts  
• No API crashes  
• Guaranteed response reliability  

---

### ✅ Demo Mode For AI Evaluation

```
?mode=demo
```

Allows:

• Longer AI timeout  
• Higher chance of AI response  
• Perfect for interviews and demos  

---

### ✅ Dockerized Backend

• Fully containerized Node.js application  
• Environment-based configuration  
• Works locally and in CI pipelines  

---

## 🧠 Why This Project Is Different

Most AI projects:

• Break when AI fails  
• Hang indefinitely  
• Crash under latency  

This system:

• Always returns a valid response  
• Uses strict timeout handling  
• Has deterministic fallback logic  

This reflects real production AI engineering practices.

---

## 🏗️ System Architecture

Client (Postman / Frontend)
        ↓
Node.js API (Express)
        ↓
Rule-Based Analysis Engine
AI Explanation Engine
Timeout & Fallback Handler

---

## 📂 Project Structure

```
dependency-risk-analyzer-backend/
│
├── src/
│   ├── core/
│   ├── services/
│   ├── explanations/
│   ├── llm/
│   ├── store/
│   ├── middlewares/
│   └── utils/
│
├── uploads/
├── Dockerfile
├── docker-compose.yml
├── index.js
└── README.md
```

---

## 🔌 API Endpoints

### Health Check

```
GET /health
```

Response:

```
{
  "ok": true,
  "service": "dependency-risk-analyzer"
}
```

---

### Analyze Dependencies

```
POST /analyze
```

Returns:

• analysisId  
• final decision  
• risk summary  

---

### Get Explanation

```
POST /explain/:analysisId
```

---

### Force AI Mode

```
POST /explain/:analysisId?mode=demo
```

---

## 🐳 Docker Usage

Build image:

```
docker build -t dependency-risk-analyzer .
```

Run container:

```
docker run -p 4000:4000 dependency-risk-analyzer
```

---

## ⚙️ Environment Variables

```
PORT=4000
DISABLE_AI=false
LLM_PROVIDER=ollama
OLLAMA_PORT=11434
```

---

## 🧪 CI/CD Pipeline

GitHub Actions automatically:

• Installs dependencies  
• Starts server  
• Runs health checks  
• Builds Docker image  

Ensuring deployment reliability.

---

## 🎯 Who This Project Is For

• Backend engineers  
• AI infrastructure developers  
• Security-focused software teams  
• Recruiters evaluating production-ready AI skills  

---

## 🚀 Future Enhancements

• Kubernetes deployment  
• Persistent database integration  
• CVE database linking  
• Frontend dashboard  
• SaaS authentication system  

---

## 👨‍💻 Author

Abhinav Anand  

Full-Stack Developer | AI & Security Enthusiast  

• MERN Stack Developer  
• DevOps & Cloud Knowledge  
• 2000+ DSA Problems Solved  
• TEFL Certified Educator  

---

## ⭐ Project Status

Production Ready  
Live Deployed  
Dockerized  
CI/CD Integrated  
AI Reliability Engineered  

---