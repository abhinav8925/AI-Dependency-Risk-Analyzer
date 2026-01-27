const analyzePackage = require("../services/dependencyService");
const {evaluateEscalation} = require("../engines/escalation/escalation.engine");
const  {evaluatePolicy} = require("../policies/policy.engine");
const {buildFinalDecision} = require("../core/finalDecision.builder");
const { generateDecisionExplanationV2 } = require("../explanations/decisionExplanation.v2");
const { reject } = require("lodash");


function withTimeout(promise, ms=4000){
    return Promise.race([
        promise, 
        new Promise((_,reject)=>
        setTimeout(() => reject(new Error("LLM timeout")),ms)
    )
    ]);
}
async function runAnalysis(packageJson){
    const analysis = await analyzePackage(packageJson.dependencies, packageJson.devDependencies);
    const allDependencies = [
        ...analysis.dependencies.analyzed,
        ...analysis.devDependencies.analyzed
    ]
    const escalation = evaluateEscalation(allDependencies);
    const policy = evaluatePolicy(escalation.triggeredDependencies);


    const finalResult = buildFinalDecision({analysis, escalation, policy});
    finalResult.decisionExplanationV2=await withTimeout(generateDecisionExplanationV2(finalResult));

    return finalResult;
    // return buildFinalDecision({
    //     analysis,
    //     escalation,
    //     policy
    // });
}

module.exports = {runAnalysis};
