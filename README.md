![CI Pipeline](https://github.com/abhinav8925/AI-Dependency-Risk-Analyzer/actions/workflows/ci.yml/badge.svg)
# 🛡️ AI-Powered Dependency Risk Analyzer

## 🔗 **Live Demo**
👉 **Public API Endpoint:**  
**https://ai-dependency-risk-analyzer.onrender.com**

> ⚠️ Note: The service runs on Render Free Tier, so the first request may take **30–60 seconds** to wake up.

---

## 📌 **Overview**

**AI-Powered Dependency Risk Analyzer** is a production-grade backend system designed to analyze a project's `package.json` and detect security risks in third-party dependencies.

It combines:

- ✅ Deterministic rule-based risk analysis  
- ✅ AI-generated security explanations  
- ✅ Guaranteed fallback mechanisms for reliability  

This project demonstrates **real-world AI system engineering**, focusing on **latency control, failure handling, and production safety**.

---

## 🚀 **Key Features**

### 🔍 **Static Dependency Risk Analysis**
- Scans both `dependencies` and `devDependencies`
- Detects:
  - Vulnerable packages
  - High-risk versions
  - License concerns

---

### ⚖️ **Final Risk Decision Engine**
Generates a clear decision:

- **BLOCK**
- **WARN**
- **ALLOW**

Based on explicit policy rules and risk severity.

---

### 🤖 **AI Security Explanation Engine**
- Uses a Large Language Model (LLM)
- Produces human-readable security reasoning
- Explains *why* a dependency is risky

---

### 🛟 **Deterministic Fallback Logic**
If AI:

- Times out
- Fails
- Is unavailable

System automatically switches to rule-based explanations.

✅ **Zero request failures**  
✅ **No hanging APIs**  
✅ **Production-safe reliability**

---

### 🎯 **Demo Mode**
Supports extended AI timeout for demonstration:

```
/explain/:analysisId?mode=demo
```

Ensures high probability of AI response during interviews.

---

### 🐳 **Dockerized Architecture**
- Fully containerized backend
- Environment-based configuration
- Works locally & in containers seamlessly

---

### ☁️ **Cloud Deployment**
- Live hosted on **Render**
- CI/CD pipeline using **GitHub Actions**
- Automated Docker builds & pushes

---

## 🧠 **Why This Project Is Unique**

Most AI projects fail when the AI fails.

This one **never does**.

### ✔ Real Production Engineering Patterns

- Time-bounded AI calls
- Explicit fallback logic
- Guaranteed responses
- Failure-safe architecture

This mirrors **how enterprise AI systems are built**.

---

## 🏗️ **System Architecture**

```
Client (Postman / Frontend)
        |
        v
Node.js API (Express)
        |
        ├── Rule-Based Risk Engine
        ├── AI Explanation Engine (LLM)
        └── Timeout & Fallback Handler
```

---

## 📂 **Project Structure**

```
dependency-risk-analyzer-backend/
│
├── src/
│   ├── core/           # Decision builders
│   ├── services/       # Risk analysis logic
│   ├── explanations/   # AI & rule explanations
│   ├── llm/            # LLM client
│   ├── store/          # In-memory storage
│   ├── middlewares/    # Validation
│   └── utils/          # Helpers
│
├── uploads/
├── index.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🔌 **API Endpoints**

---

### 🩺 Health Check

**POST** `/health`

Response:
```json
{
  "ok": true,
  "service": "dependency-risk-analyzer"
}
```

---

### 📦 Analyze Dependencies

**POST** `/analyze`

Upload `package.json` as form-data.

Response:
```json
{
  "success": true,
  "analysisId": "uuid",
  "finalDecision": { "action": "BLOCK" }
}
```

---

### 🧠 Get Explanation

**POST** `/explain/:analysisId`

Demo Mode:
```
/explain/:analysisId?mode=demo
```

---

## ⏱️ **AI Timeout Strategy**

| Mode | Timeout | Behavior |
|------|--------|----------|
| Normal | ~30s | AI attempt → fallback |
| Demo | ~60s | Higher AI success rate |

---

## ⚙️ **Environment Variables**

```
PORT=4000
DISABLE_AI=false
LLM_PROVIDER=ollama
OLLAMA_HOST=127.0.0.1
OLLAMA_PORT=11434
```

---

## 🐳 **Docker Usage**

Build:

```
docker build -t dependency-risk-analyzer .
```

Run:

```
docker run -p 4000:4000 dependency-risk-analyzer
```

---

## 🔄 **CI/CD Pipeline**

Implemented using **GitHub Actions**.

Pipeline automatically:

- Installs dependencies
- Runs health checks
- Builds Docker image
- Pushes image to Docker Hub

---

## ☁️ **Live Deployment**

Hosted on **Render Cloud Platform**.

### 🌍 Public API URL:

👉 **https://ai-dependency-risk-analyzer.onrender.com**

---

## 🎯 **Use Cases**

- Software supply chain security
- Dependency risk auditing
- DevSecOps pipelines
- Security compliance analysis

---

## 🚀 **Future Enhancements**

- Authentication & API keys
- Frontend dashboard
- Persistent database
- SBOM ingestion
- CVE database integration
- Kubernetes deployment

---

## 👨‍💻 **Author**

### **Abhinav Anand**
Full-Stack Developer | AI & Security Enthusiast

- MERN Stack Developer
- DevOps & Cloud Enthusiast
- AI-Driven Security Solutions Builder

---

## ⭐ **If you like this project**

Please ⭐ the repository and share!
