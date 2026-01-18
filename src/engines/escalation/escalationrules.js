// module.exports = {
//     NO_CRITICAL_PROD_VULNS:{
//         severity: "CRITICAL",
//         appliesTo: "dependency",
//         decision: "BLOCK"
//     },

//     NO_HIGH_PROD_VULNS:{
//         severity: "HIGH",
//         apliesTo:"dependency",
//         decision: "BLOCK"
//     },

//     WARN_HIGH_DEV_VULNS:{
//         severity: "HIGH",
//         appliesTo: "devDependency",
//         decision: "WARN"
//     },

//     WARN_CONTROL_DEV_VULNS:{
//         severity: "CRITICAL",
//         appliesTo: "devDependency",
//         decision: "WARN"
//     }
// };

const {ESCALATION_ACTIONS} = require("./escalation.constants");

const escalationRules  = [
    {
        name: "HIGH_VULN_PROD_DEP",
        condition: (dep) =>
            dep.dependencyType === "dependency" && dep.vulnerable && dep.vulnerabilities.some(v=>v.severity === "HIGH"),
        action: ESCALATION_ACTIONS.BLOCK,
        reason: "High severity vulnerability in production dependency"
    },

    {
        name: "HIGH_VULN_DEV_DEP",
        condition: (dep) =>
            dep.dependencyType === "devDependency" && dep.vulnerable && dep.vulnerabilities.some(v=>v.severity === "HIGH"),
        action: ESCALATION_ACTIONS.WARN,
        reason: "High severity vulnerability in dev dependency"
    },

    {
        name: "FORBIDDEN_LICENSE",
        condition: (dep) =>
            dep.licenseRisk === "high",
        action: ESCALATION_ACTIONS.BLOCK,
        reason: "Dependency uses a forbidden or restrictive license"
    },

    {
        name: "MEDIUM_LICENSE_RISK",
        condition: (dep) =>
            dep.licenseRisk === "medium",
        action: ESCALATION_ACTIONS.WARN,
        reason: "License requires legal review"
    },

    {
        name: "HIGH_RISK_SCORE",
        condition: (dep) =>
            dep.riskScore >= 8 && dep.dependencyType === "dependency",
        action: ESCALATION_ACTIONS.WARN,
        reason: "High aggregated risk score in production dependency."
    },
];

module.exports = escalationRules;
