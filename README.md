📦 **AI-Powered Dependency Risk Analyzer**
An AI-assisted software supply chain security tool that analyzes package.json files, evaluates dependency risks, enforces security policies, and generates human-readable explanations using a local LLM with safe fallback mechanisms.
This project is designed with production-grade resilience, ensuring security decisions remain deterministic even when AI is slow or unavailable.

## Why This Project Exists 🚀 
Modern applications rely heavily on third-party dependencies.
A single vulnerable dependency can compromise the entire system.
This tool helps by:
Detecting high-risk dependencies
Enforcing security escalation policies
Producing clear explanations for security decisions
Using AI responsibly, never as a single point of failure

## Key Features 🧠 
**🔍 Dependency Risk Analysis**
Parses dependencies and devDependencies
Detects known vulnerabilities
Assigns risk scores and severity levels


##  Policy & Escalation Engine 🚨
Automatically BLOCKS, WARNS, or ALLOWS dependencies
Rule-based decision system for deterministic behavior

##  AI-Generated Security Explanations 🤖
Uses local LLM (Ollama + Llama 3)
Generates concise, professional explanations
Explains why a decision was made, not just what

##  Safe AI Fallback (Production-Grade)🛡️
If AI takes longer than a defined timeout:
Automatically falls back to rule-based explanations
Guarantees no request ever hangs
Guarantees no AI dependency for security decisions

 ## Demo Mode (Recruiter Friendly)🎯
Allows controlled AI generation for demos
Proves AI capability without risking instability

##  System Architecture (High Level)🏗️

Client (package.json upload)
        ↓
Dependency Analyzer
        ↓
Risk Scoring Engine
        ↓
Policy & Escalation Rules
        ↓
Final Decision (BLOCK / WARN / ALLOW)
        ↓
┌───────────────┐
│ AI Explanation│  ← Ollama (Llama 3)
└───────────────┘
        ↓ (timeout or error)
Rule-Based Explanation (Guaranteed)

🔑 Security decisions never depend on AI availability

 ## API Endpoints 📡
✅ Health Check

POST /health
Response

Json
{
  "ok": true,
  "service": "dependency-risk-analyzer",
  "message": "Server is healthy"
}

## Analyze Dependencies📦

POST /analyze

Input
Multipart form-data
Key: file
Value: package.json

Response
Json
{
  "success": true,
  "analysisId": "uuid",
  "finalDecision": {
    "action": "BLOCK"
  },
  "summary": {
    "totalDependencies": 7,
    "riskSeverity": "HIGH"
  }
}


🤖 Get Explanation

POST /explain/:analysisId

Optional demo mode:

POST /explain/:analysisId?mode=demo

AI Response

Json
{
  "success": true,
  "explanation": {
    "version": "v2",
    "source": "AI",
    "explanation": "The final decision was to block..."
  },
  "aistatus": "AI"
}

Fallback Response

Json
{
  "success": true,
  "explanation": {
    "version": "v1",
    "source": "RULE_BASED"
  },
  "aistatus": "RULE_BASED"
}


## AI Design Philosophy (Important) 🧠 

This project follows Responsible AI principles:
AI is used for explanations only
Security decisions are always deterministic
AI failures never break the system
Timeouts ensure predictable performance
AI enhances understanding — it never replaces policy enforcement.

 ## Tech Stack 🛠️
Backend: Node.js, Express
AI: Ollama (Llama 3 – local inference)
Security Logic: Custom rule & escalation engine
Storage: In-memory store (extensible to Redis/DB)
Deployment Ready: Docker (coming next)

🧪 Example Use Case
Upload a package.json
System detects high-risk dependency (lodash, minimist)
Policy engine blocks the dependency
AI generates a security-focused explanation
If AI is slow → fallback explanation is returned instantly

##  Future Enhancements 🔮
Docker Compose (API + Ollama)
CI/CD pipeline
Persistent storage (Redis / MongoDB)
SBOM export
GitHub dependency scanning integration

##  Author 🧑‍💻
Abhinav Anand
Full-Stack Developer | Security-Focused Backend Engineer
AI-Driven Systems | Supply Chain Security
