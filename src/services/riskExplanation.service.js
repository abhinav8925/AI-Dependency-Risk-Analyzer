function generateRiskExplanation(projectRisk){
    const {severity, totalDependencies, policyViolations=[]} = projectRisk;

    if(severity === "CRITICAL")
            return `Project is CRITICAL. One or more critical vulnerabilities were detected. Immediate remediation is required.`;
        
    if(severity === "HIGH")
            return `Project has HIGH risk due to serious security vulnerabilites. Prompt action is strongly recommended.`;
        
    if(severity === "MODERATE")
            return `Project shows moderate risk. Some dependencies require attention to prevent escalation`;
        
    if(severity === "LOW")
            return `Project risk is low. All${totalDependencies} dependencies appear stable with no critical threats detected.`;

    return "Risk level could not be determined due to insufficient data.";

}

module.exports = generateRiskExplanation;