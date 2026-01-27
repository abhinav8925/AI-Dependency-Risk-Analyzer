

// async function callLLM(prompt) {
//     return `The project was blocked because critical security risks were detected in production dependencies.
//     High severity vulnerabilities and restrictive licenses increase the risk of exploitation and legal exposure.
//     It is strongly recommended to upgrade affeected packages or replace them with secure alternatives.`;
// }
// async function generateDecisionExplanationV2(finalResult){
    // try{
    //     const prompt = `You are a software supply chain security expert.
    //     Explain the following dependency risk decision in clear, professional language.
    //     DO NOT invent data. Only explain what is provided.
        
    //     Final decision: ${JSON.stringify(finalResult.finalDecision,null,2)}
        
    //     Escalation details: ${JSON.stringify(finalResult.escalation,null,2)}
        
    //     Policy Result: ${JSON.stringify(finalResult.policy,null, 2)}
        
    //     Return JSON with 
    //     -primaryReason
    //     -contributingFactors(array)
    //     -blockedDependencies(array)
    //     -recommendedActions(array)`;


//         // const input = mapToExplanationInput(finalResult);
//         // const prompt = buildExplanationPrompt(input);
//         // const explanation = await callLLM(prompt);

//         const response = await callLLM([
//             {role: "system", content: "You explain security decisions clearly."},
//             {role: "user", content: prompt}
//         ]);

//         return {
//             version: "v2",
//             // explanation
//             ...JSON.parse(response)
//         };
//     }catch(err){
//         return generateDecisionExplanationV1(finalResult);
//     }
// }

const {mapToExplanationInput} = require("./explanation.mapper");
const {buildExplanationPrompt} = require("./explanation.prompt");
const {callLLM} = require("../llm/llm.client")
const {generateDecisionExplanationV1} = require("./decisionExplanation.v1");
const { version } = require("prompt");

async function generateDecisionExplanationV2(finalResult){
    try{
        
        
        const prompt = `You are a security dependency risk analysis assistant.
        Given the following JSON analysis result, explain the final decision in plain English.      
        
        Return JSON with 
        -primaryReason
        -contributing Factors
        -blockedDependencies
        -recommendedActions;
        JSON :${JSON.stringify(finalResult ,null, 2)}
        `
        // const response = await callLLM([
        //     {
        //         role: "system",
        //         content: "You are a security risk analysis assistant."
        //     },
        //     {
        //         role: "user",
        //         content:`Explain the security decision in simple terms.
        //         Input: ${JSON.stringify(input, null, 2)}`
        //     }
        // ]);
        const response = await callLLM(prompt);
        return {
            version: "v2",
            explanations: response
        };
        // clearTimeout(timeout);
        // return {
        //     version: "v2",
        //     primaryReason: response.trim()
        // };
    }catch(error){
        console.error("Ollama failed, falling back to V1: ", error.message);
        return generateDecisionExplanationV1(finalResult);
    }
}

module.exports = {generateDecisionExplanationV2};