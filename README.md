🛡️ AI-Powered Dependency Risk Analyzer
A production-grade software supply chain security analyzer with AI explanations and deterministic fallback logic
📌 Overview
AI-Powered Dependency Risk Analyzer is a backend system that analyzes a project’s package.json to identify security, vulnerability, and policy risks in third-party dependencies.
The system combines:
Rule-based deterministic security analysis
AI-generated security explanations (via LLMs)
Graceful fallback mechanisms to ensure reliability even when AI is slow or unavailable
This project is designed with real-world production constraints in mind — latency, reliability, and failure handling are first-class citizens.
🚀 Key Features
✅ Static Dependency Risk Analysis
Scans both dependencies and devDependencies
Detects high-risk packages, vulnerable versions, and license issues
✅ Final Risk Decision Engine
Produces a BLOCK / WARN / ALLOW decision
Backed by explicit escalation and policy rules
✅ AI-Generated Security Explanations
Uses a Large Language Model to explain why a decision was made
Generates human-readable, security-focused summaries
✅ Rule-Based Fallback (Production Safe)
If AI takes too long or becomes unavailable, the system automatically falls back to a deterministic explanation
Guarantees zero request failures
✅ Demo Mode for AI Evaluation
Optional demo mode allows extended AI timeouts for showcasing AI responses
Useful for interviews and demos
✅ Dockerized Backend
Fully containerized Node.js backend
Environment-driven configuration for local and containerized runs
🧠 Why This Project Is Different
Most “AI projects” break when the AI fails.
This one doesn’t.
✔ Real-World Engineering Decisions
AI calls are time-bounded
Fallback logic is explicit and guaranteed
System always returns a valid response
No request ever hangs indefinitely
This is how AI systems are built in production — not in demos.


Client (Postman / Frontend)
        |
        v
Node.js API (Express)
        |
        +--> Rule-Based Analysis Engine
        |
        +--> AI Explanation Engine (LLM)
                 |
                 +--> Timeout / Fallback Handler



dependency-risk-analyzer-backend/
│
├── src/
│   ├── core/                # Analysis pipeline & decision builders
│   ├── services/            # Dependency & risk analysis services
│   ├── explanations/        # AI & rule-based explanation logic
│   ├── llm/                 # LLM client, timeout handling
│   ├── store/               # In-memory analysis storage
│   ├── middlewares/         # Validation & error handling
│   └── utils/               # Shared utilities & helpers
│
├── uploads/                 # Temporary uploaded package.json files
├── index.js                 # Application entry point
├── Dockerfile               # Backend container definition
├── .env                     # Environment configuration
└── README.md

🔌 API Endpoints
🔹 Health Check
   

POST /health
Response
   
Json
{
  "ok": true,
  "service": "dependency-risk-analyzer",
  "message": "Server is healthy."
}
🔹 Analyze Dependencies
   

POST /analyze
Input
Multipart form-data
Upload a package.json file
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
🔹 Get Explanation (AI + Fallback)
   

POST /explain/:analysisId
Optional Demo Mode
   

POST /explain/:analysisId?mode=demo
Response (AI)
   
Json
{
  "success": true,
  "explanation": {
    "version": "v2",
    "source": "AI",
    "explanation": "Human-readable security explanation..."
  },
  "aistatus": "AI"
}
Response (Fallback)
   
Json
{
  "success": true,
  "explanation": {
    "version": "v1",
    "primaryReason": "High severity vulnerabilities detected."
  },
  "aistatus": "RULE_BASED"
}
⏱️ AI Timeout & Fallback Strategy
Mode
AI Timeout
Behavior
Normal
~30 sec
AI attempt → fallback if slow
Demo Mode
~60 sec
Higher chance of AI response
✔ Guarantees response
✔ Prevents API hangs
✔ Production-safe by design
🐳 Docker Usage
Build Image
   
Bash
docker build -t dependency-risk-analyzer .
Run Container
   
Bash
docker run -p 4000:4000 --env-file .env dependency-risk-analyzer
Ollama runs on the host and is accessed from Docker via host.docker.internal
⚙️ Environment Variables
   
Env
PORT=4000
LLM_PROVIDER=ollama
OLLAMA_HOST=host.docker.internal
OLLAMA_PORT=11434
🧪 Testing
API tested using Postman
Handles:
Invalid JSON
Missing dependencies
AI timeouts
Containerized execution
🎯 Who This Project Is For
Recruiters evaluating backend + AI engineering
Security-focused software teams
Demonstrating real AI reliability patterns
Interviews requiring architecture reasoning
📌 Future Enhancements
Docker Compose (backend + Ollama)
Persistent storage (Redis / DB)
SBOM ingestion
CVE database integration
Frontend dashboard
🙌 Author
Abhinav Anand
Full-Stack Developer | AI & Security Enthusiast
