const rules = require("../utils/policyRules");
function evaluateEscalationPolicies(dependencies){

    const violations = [];

    const highVulns = dependencies.filter(d => d.vulnerabilites ?.some(v => v.severity === "HIGH"));
    const mediumVulns = dependencies.filter(d => d.vulnerabilites?.some(v => v.severity === "MEDIUM"));

    if(highVulns.length >0){
        violations.push({
            rule: "HIGH_VULNERABILITIES_PRESENT",
            ...rules.HIGH_VULNERABILITY_PRESENT
        });
    }

    if(mediumVulns.length >= 3){
        violations.push({
            rule: "MULTIPLE_MEDIUM_VULNS",
            ...rules.MULTIPLE_MEDIUM_VULNS
        });
    }

    return violations;
}

module.exports = {evaluateEscalationPolicies};