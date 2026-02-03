// const { reject } = require("lodash");
const { callLLM } = require("../llm/llm.client");
const {withTimeout} = require("../llm/withTimeout");
const { generateDecisionExplanationV1 } = require("./decisionExplanation.v1");

async function generateDecisionExplanationV2(finalResult) {
     
    const escalation = finalResult.escalation;
    const decision = finalResult.finalDecision.action;

    const blockedDeps = [];
    const reasons = [];

    if(escalation?.triggeredDependencies?.length){
        for (const dep of escalation.triggeredDependencies){
            if(dep.finalAction === "BLOCK"){
                blockedDeps.push(dep.dependency);
                for(const rule of dep.triggeredRules){
                    reasons.push(`${dep.dependency}: ${rule.reason}`);
                }
            }
        }
    }

    const llmInput = {
        decision,
        riskSeverity:finalResult.summary.riskSeverity,
        blockedDependencies: blockedDeps,reasons,
        totalDependencies:finalResult.summary.totalDependencies
    };

   const prompt = `
You are a software supply chain security expert.

Explain the FINAL DECISION of a dependency risk analysis tool.

Rules:
- 60 to 90 words
- Clear, professional, security-focused
- No markdown, no bullet points
- Mention blocked dependencies if any
- Explain WHY the decision was made

Analysis:
Decision: ${decision}
Risk severity: ${finalResult.summary.riskSeverity}
Blocked dependencies: ${blockedDeps.join(", ") || "None"}
Reasons: ${reasons.join("; ")}
`;

    try{
        const aiResponse = await withTimeout(callLLM(prompt), 30_000);
        return {
            version: "v2",
            explanation: aiResponse.trim(),
            source: "AI"
        };
    }catch(err){
        return {
            ...generateDecisionExplanationV1(finalResult),
            source: "RULE_BASED",
            note: "AI timed out or unavailable"
        }
    }
}



module.exports = { generateDecisionExplanationV2 };