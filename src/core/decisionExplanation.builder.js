const FINAL_DECISION = {
    ALLOW: "ALLOW",
    WARN: "WARN",
    BLOCK: "BLOCK"
}

function buildDecisionExplanation({
    decision, escalation,analysis
}){
    const explanation = {
        primaryReason: null,
        contributingFactors: [],
        blockedDependencies: [],
        recommendedActions: []
    };

    if(decision === FINAL_DECISION.BLOCK){
        const blockedDeps = escalation.triggeredDependencies.filter(dep =>dep.finalAction === "BLOCK");
        explanation.primaryReason = "One or more production dependencies contain high severity security vulnerabilities.";
        blockedDeps.forEach(dep => {
            explanation.blockedDependencies.push(dep.dependency);
            const highVulnRule = dep.triggeredRules.find(rule => rule.action === "BLOCK");
            if(highVulnRule){
                explanation.contributingFactors.push(`${dep.dependency}: ${highVulnRule.reason}`);
            }
        });
        explanation.recommendedActions.push("Upgrade or replace the blocked dependencies with secure versions.");
    }

    if(decision === FINAL_DECISION.WARN){
        explanation.primaryReason = "Potential risks detected that require manual review.";
        explanation.recommendedActions.push("Review flagged dependencies and address license or security concerns.");
    }

    if(decision === FINAL_DECISION.ALLOW){
        explanation.primaryReason = "No blocking security or policy violations were detected.";
        explanation.recommendedActions.push("Proceed with deployment while monitoring future dependency updates.");
    }

    return explanation;
}

module.exports = {buildDecisionExplanation};