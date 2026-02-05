// const { reject } = require("lodash");
const { callLLM } = require("../llm/llm.client");
const {withTimeout} = require("../llm/withTimeout");
const { generateDecisionExplanationV1 } = require("./decisionExplanation.v1");

async function generateDecisionExplanationV2(finalResult, options={}) {

    const demoMode = options.demo === true; 
    console.log("[AI] generatedDecisionExplanationV2 called,",
         {demoMode,
         decision: finalResult.finalDecision?.action})
    const escalation = finalResult.escalation;
    const decision = finalResult.finalDecision.action;

    const blockedDeps = [];
    const reasons = [];

    if(finalResult.escalation?.triggeredDependencies?.length){
        for (const dep of finalResult.escalation.triggeredDependencies){
            if(dep.finalAction === "BLOCK"){
                blockedDeps.push(dep.dependency);
            }
        }
    }

    // const llmInput = {
    //     decision,
    //     riskSeverity:finalResult.summary.riskSeverity,
    //     blockedDependencies: blockedDeps,reasons,
    //     totalDependencies:finalResult.summary.totalDependencies
    // };

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
    
    Risk severity: ${finalResult.summary.riskSeverity}
    Blocked dependencies: ${blockedDeps.join(", ") || "None"}
    
    `;

    try{
        console.log("[AI] Calling LLM...",{
            timeoutMs: demoMode ?75000:30000
        });
        const response = await withTimeout(callLLM(prompt), {
            timeoutMs: demoMode ? 75000:30000,
            // maxTokens: demoMode ? 80:120
        });
        console.log("[AI] LLM SUCCESS");
        
        return {
            version: "v2",
            explanation: response,
            source: "AI"
        };
    }catch(err){
        console.warn("[AI] AI unavailable, using fallback: ", err.message);
        // return {
        //     ...generateDecisionExplanationV1(finalResult),
        //     source: "RULE_BASED",
        //     note: err.message
        // }
        return generateDecisionExplanationV1(finalResult);
    }
}

module.exports = { generateDecisionExplanationV2 };