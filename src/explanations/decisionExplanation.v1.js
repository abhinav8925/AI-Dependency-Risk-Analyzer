function generateDecisionExplanationV1(finalResult){
    
    const escalation = finalResult.escalation;
    const decision = finalResult.finalDecision.action;

    const blockedDeps = [];
    const reasons = [];

    if(escalation?.triggeredDependencies?.length){
        for(const dep of escalation.triggeredDependencies){
            if(dep.finalAction === "BLOCK"){
                blockedDeps.push(dep.dependency);

                for(const rule of dep.triggeredRules){
                    reasons.push(`${dep.dependency}: ${rule.reason}`);
                }
            }
        }
    }

    let primaryReason = "No critical risks detected.";

    if(decision === "BLOCK"){
        primaryReason = "One or more production dependencies contain high severity security vulnerabilities."
    }else if(decision === "WARN")
            primaryReason = "Potential risk were detected that require attention but do not block usage."
        
    return {
        version: "v1",
        primaryReason,
        contributingFactors: reasons,
        blockedDependencies: blockedDeps,
        recommendations:blockedDeps.length > 0 ? ["Upgrade or replace the blocked dependencies with secure versions."] : ["Continue monitoring dependencies for future vulnerabilities."]
    };
}

module.exports = {generateDecisionExplanationV1};