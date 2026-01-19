const {ESCALATION_ACTIONS} = require("./escalation.constants");

const escalationRules  = [
    {
        name: "HIGH_VULN_PROD_DEP",
        priority: 1,
        condition: (dep) =>
            dep.dependencyType === "dependency" && dep.vulnerable && dep.vulnerabilities.some(v=>v.severity === "HIGH"),
        action: ESCALATION_ACTIONS.BLOCK,
        reason: "High severity vulnerability in production dependency"
    },
    

    {
        name: "FORBIDDEN_LICENSE",
        priority: 2,
        condition: (dep) =>
            dep.licenseRisk === "high",
        action: ESCALATION_ACTIONS.BLOCK,
        reason: "Dependency uses a forbidden or restrictive license"
    },

    {
        name: "HIGH_VULN_DEV_DEP",
        priority: 3,
        condition: (dep) =>
            dep.dependencyType === "devDependency" && dep.vulnerable && dep.vulnerabilities.some(v=>v.severity === "HIGH"),
        action: ESCALATION_ACTIONS.WARN,
        reason: "High severity vulnerability in dev dependency"
    },

    {
        name: "HIGH_RISK_SCORE",
        priority: 4,
        condition: (dep) =>
            dep.riskScore >= 8 && dep.dependencyType === "dependency" && !dep.vulnerable,
        action: ESCALATION_ACTIONS.WARN,
        reason: "High aggregated risk score in production dependency."
    },

    {
        name: "MEDIUM_LICENSE_RISK",
        priority: 5,
        condition: (dep) =>
            dep.licenseRisk === "medium",
        action: ESCALATION_ACTIONS.WARN,
        reason: "License requires legal review"
    },

];

module.exports = escalationRules;
