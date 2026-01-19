const { severity } = require("../types/vulnerability.schema");

module.exports = [
    {
        id: "NO_HIGH_VULN_PROD",
        description: "High severity vulnerablities are not allowed in production dependencies",
        severity: "critical",
        action: "block",
        condition:(dep) =>
            dep.dependencyType === "dependency" && dep.vulnerable === true && dep.vulnerabilites.some(v =>v.severity === "HIGH")
        
        
    },

    {
        id: "NO_HIGH_VULN_DEV_DEP",
        description: "High severity vulnerablities in dev dependencies require review",
        severity: "high",
        action: "warn",
        condition:(dep) =>
            dep.dependencyType === "devDependency" && dep.vulnerable === true && dep.vulnerabilites.some(v =>v.severity === "HIGH")
        
        
    },

    {
        id: "FORBIDDEN_LICENSE",
        description: "Dependencies with forbidden or strong copyleft licenses are blocked",
        severity: "high",
        action: "block",
        condition:(dep) =>
            dep.licenseRisk === "high",
        
    },

    {
        id: "MEDIUM_LICENSE_REVIEW",
        description: "Medium risk license require legal review",
        severity: "medium",
        action: "warn",
        condition:(dep) =>
            dep.licenseRisk === "medium",
        
    },
    {
        id: "HIGH_RISK_SCORE_PROD",
        description: "Production dependencies with very high aggregated risk score require attention.",
        severity: "medium",
        action: "warn",
        condition: (dep) =>
            dep.dependencyType === "dependency" && typeof dep.riskScore === "number" && dep.riskScore >=8
    }
];
