const analyzePackage = require("../services/dependencyService");
const {evaluateEscalation} = require("../engines/escalation/escalation.engine");
const  {evaluatePolicy} = require("../policies/policy.engine");
const {buildFinalDecision} = require("../core/finalDecision.builder");

async function runAnalysis(packageJson){
    const analysis = await analyzePackage(packageJson.dependencies, packageJson.devDependencies);
    const allDependencies = [
        ...analysis.dependencies.analyzed,
        ...analysis.devDependencies.analyzed
    ]
    const escalation = evaluateEscalation(allDependencies);
    const policy = evaluatePolicy(escalation.triggeredDependencies);

    return buildFinalDecision({
        analysis,
        escalation,
        policy
    });
}

module.exports = {runAnalysis};
