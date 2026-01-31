const { callLLM } = require("../llm/llm.client");
const { generateDecisionExplanationV1 } = require("./decisionExplanation.v1");

async function generateDecisionExplanationV2(finalResult) {
  try {
   
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
    -120-180 words maximum
    -Clear, professional, security-focused
    -No markdown, no bullet points
    -Mention specific blocked dependencies if any
    -Explain WHY the decision was made, not what dependencies are
    -Clear security reasoning
    Analysis Data: ${JSON.stringify(llmInput, null, 2)}
    `;

        const response = await callLLM(prompt);

        return {
        version: "v2",
        explanation: response.trim()
        };
    } catch (error) {
        console.error("Ollama failed, falling back:", error.message);
        return generateDecisionExplanationV1(finalResult);
    }
    }

    module.exports = { generateDecisionExplanationV2 };