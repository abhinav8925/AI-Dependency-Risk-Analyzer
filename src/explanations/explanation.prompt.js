function buildExplanationPrompt(input){
    return `You are a software supply chain security expert. Explain the folllowing dependency risk decision clearly and professionally.
    Decision: ${input.decision}
    Overall Risk: ${input.riskSeverity}
    
    Blocked Dependencies: ${input.blockedDependencies.join(",")}
    Reasons: ${input.reasons.join("\n")}
    
    Explain: 1. Why the decision was made
    2. What the main risks are
    3. What actions the developer should take
    
    Keep the explanation concise, factual, and non-alarmist.`;
}

module.exports = {buildExplanationPrompt}