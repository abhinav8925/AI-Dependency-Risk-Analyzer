const {buildDecisionExplanation} = require("./decisionExplanation.builder")
const FINAL_DECISION = {
    ALLOW: "ALLOW",
    WARN: "WARN",
    BLOCK: "BLOCK"
}

function buildFinalDecision({
    // policyResult,
    // totalDependencies,
    // policyVersion = "v1.0.0"
    analysis, 
    escalation, 
    policy
}){
    
    let decision = FINAL_DECISION.ALLOW;
    
    if(policy.finalAction === "BLOCK" || escalation.decision === "BLOCK"){
        decision = FINAL_DECISION.BLOCK;
    }else if(policy.finalAction === "WARN" || escalation.decision === "WARN"){
        decision = FINAL_DECISION.WARN
    }
    
    const explanation = buildDecisionExplanation({
        decision,
        escalation,
        analysis
    })
    
    
    return {
        finalDecision: {
            action: decision,
            authority: "FINAL_DECISION_BUILDER"
        },
        decisionExplanation: explanation,
        summary:{
            totalDependencies: analysis.projectRisk.totalDependencies,
            riskScore: analysis.projectRisk.score,
            riskSeverity: analysis.projectRisk.severity 
        },
        analysis,
        escalation,
        policy
    };
}

module.exports = {buildFinalDecision, FINAL_DECISION};