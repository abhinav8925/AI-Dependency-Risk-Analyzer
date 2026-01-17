An AI-ready backend service that analyzes project dependencies for security vulnerabilities, license risks, policy violations, and escalation decisions — designed for real-world CI/CD and supply-chain security use cases.

## Overview
Modern software relies heavily on third-party dependencies, which introduces serious supply-chain risks such as:
High-severity vulnerabilities,
Risky or unknown licenses,
Transitive dependency exposure,
Policy violations in CI/CD pipelines,
This project analyzes both production and development dependencies and provides a clear allow / warn / block decision using rule-based escalation policies.



## Key Features

🔍 Dependency Analysis
Separates dependencies and devDependencies, 
Version-based risk detection (^, ~, latest, *), 
Individual dependency risk scoring

🛡 Vulnerability Engine
Detects known vulnerabilities per package, 
Severity classification (LOW / MEDIUM / HIGH), 
CVSS-style metadata support

📜 License Risk Engine
Detects common licenses (MIT, Apache, GPL, Unknown), 
Assigns license risk levels, 
Flags licenses requiring legal review

📐 Policy Engine
Project-level policy evaluation, 
Aggregates dependency risks,
Calculates overall project severity,

🚨 Escalation Engine (Core Highlight)
Rule-based ALLOW / WARN / BLOCK decisions,
Differentiates prod vs dev dependencies,
Multiple rules per dependency supported,
Clean, structured escalation output

## Tech Staks
Node.js
Express.js
JavaScript (ES6+)
Modular service-based architecture
CI/CD ready (GitHub Actions compatible)

##🎯 Real-World Use Cases
CI/CD pipeline dependency scanning
Supply-chain security enforcement
Pre-merge risk analysis
Open-source compliance checks
Security posture reporting

## GitHub & Live Links
 [GitHub]() | [Live]()

## Installation
git clone  https://github.com/abhinav8925/AI-Dependency-Risk-Analyzer
cd dependency-risk-analyzer-backend
npm install
npm run dev

## Planned Enhancements
🤖 AI-powered risk explanations
🔁 GitHub Actions integration
📊 Dashboard / UI visualization
🧪 Unit & integration tests
🌐 Public API documentation (Swagger)

## Why This Project Matters 🧠
This project demonstrates:
Backend system design
Security-first thinking
Rule-based decision engines
Scalable architecture
Real-world DevSecOps awareness
Not a toy project. Built with production intent.

## Usage
- Upload a project dependency file to detect security risks  


## Author

Abhinav Anand |
Full-Stack Developer | Security-Focused Engineer
