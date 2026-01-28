const analyzePackage = require("../services/dependencyService");
const {evaluateEscalation} = require("../engines/escalation/escalation.engine");
const  {evaluatePolicy} = require("../policies/policy.engine");
const {buildFinalDecision} = require("../core/finalDecision.builder");
const { generateDecisionExplanationV2 } = require("../explanations/decisionExplanation.v2");
const { reject } = require("lodash");


// function withTimeout(promise, ms=4000){
//     return Promise.race([
//         promise, 
//         new Promise((_,reject)=>
//         setTimeout(() => reject(new Error("LLM timeout")),ms)
//     )
//     ]);
// }


async function runAnalysis(packageJson){
    const analysis = await analyzePackage(packageJson.dependencies, packageJson.devDependencies);
    const allDependencies = [
        ...analysis.dependencies.analyzed,
        ...analysis.devDependencies.analyzed
    ]
    const escalation = evaluateEscalation(allDependencies);
    const policy = evaluatePolicy(escalation.triggeredDependencies);


    const finalResult = buildFinalDecision({analysis, escalation, policy});
    try{
        finalResult.decisionExplanationV2=await Promise.race([generateDecisionExplanationV2(finalResult),new  Promise((_,reject)=> setTimeout(()=> reject(new Error("LLM Timeout")),12000))]);

    }catch(err){
        console.warn("LLM skipped:",err.message);
        finalResult.decisionExplanationV2=null;
    }
    
    return finalResult;
    // return buildFinalDecision({
    //     analysis,
    //     escalation,
    //     policy
    // });
}

module.exports = {runAnalysis};
