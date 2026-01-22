function mapToExplanationInput(finalResult){
    const blockDeps = finalResult.escalation.triggeredDependencies?.filter(d=> d.finalAction === "BLOCK").map(d=>d.dependency) || [];

    const reasons = finalResult.escalation.triggeredDependencies?.flatMap(d=>d.triggeredRules.map(r => `${d.dependency}: ${r.reason}`)) || [];

    return {
        decision: finalResult.finalDecision.action,
        blockedDependencies: blockedDeps,
        reasons,
        riskSeverity: finalResult.summary.riskSeverity
    };
}

module.exports = {mapToExplanationInput};