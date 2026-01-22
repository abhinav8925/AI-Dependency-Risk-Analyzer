const {mapToExplanationInput} = require("./explanation.mapper");
const {buildExplanationPrompt} = require("./explanation.prompt");
const {generateDecisionExplanationV1} = require("./decisionExplanation.v1");

async function callLLM(prompt) {
    return `The project was blocked because critical security risks were detected in production dependencies.
    High severity vulnerabilities and restrictive licenses increase the risk of exploitation and legal exposure.
    It is strongly recommended to upgrade affeected packages or replace them with secure alternatives.`;
}
async function generateDecisionExplanationV2(finalResult){
    try{
        const input = mapToExplanationInput(finalResult);
        const prompt = buildExplanationPrompt(input);
        const explanation = await callLLM(prompt);

        return {
            version: "v2",
            explanation
        };
    }catch(err){
        return generateDecisionExplanationV1(finalResult);
    }
}

module.exports = {generateDecisionExplanationV2};