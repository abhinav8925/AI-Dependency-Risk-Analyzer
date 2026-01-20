const generateRiskExplanation = require("./riskExplanation.service");
const analyzeDependencies = require("../utils/dependencyAnalyzer");
const { calculateProjectRisk } = require("./projectRisk.service");

// const applyRiskPolicies =require("./riskPolicy.service");
// const calculateProjectSeverity = require ("../utils/projectSeverity")

// const {evaluateProjectPolicy} = require("./policyEngine.service");

// const {evaluateEscalation} = require("../engines/escalation/escalationEvaluater")

// const {evaluatePolicy} = require("../policies/policy.engine")


function buildRiskStats(analyzedList){
    let high =0, medium=0,low=0;

    analyzedList.forEach(dep => {
        if(dep.riskLevel === "high")    high++;
        if(dep.riskLevel === "medium")  medium++;
        if(dep.riskLevel === "low") low++;
    });

    return{
        total: analyzedList.length,
        high,
        medium,
        low,
        analyzed: analyzedList
    };
}


function analyzePackage(dependencies={}, devDependencies={}){
    const analyzedDeps = analyzeDependencies(dependencies, "dependency");
    const analyzedDevDeps = analyzeDependencies(devDependencies, "devDependency");

    
    const allAnalyzedDeps = [...analyzedDeps, ...analyzedDevDeps];
    
    // const escalationResult = evaluateEscalation(allAnalyzedDeps)
    // const policyResult = evaluatePolicy(escalationResult.triggeredDependencies);

    const dependencyStats = buildRiskStats(analyzedDeps)
    const devDependencyStats = buildRiskStats(analyzedDevDeps)

    const projectRisk = calculateProjectRisk(dependencyStats,devDependencyStats);
    // const policyAdjustedRisk = applyRiskPolicies(projectRisk);


   
    const riskExplanation = generateRiskExplanation(projectRisk);
    
    // const finalDecision = policyResult.finalAction === "BLOCK" ? "BLOCK" :policyResult.finalAction === "WARN" ? "WARN":escalationResult.decision;

    // const totalHigh = dependencies.high + devDependencies.high;
    // const totalMedium = dependencies.medium + devDependencies.medium;
    // const totalLow = dependencies.low + devDependencies.low;


    
    return {
        dependencies: dependencyStats,
        devDependencies: devDependencyStats,
        projectRisk,
        // policy: policyResult,
        // escalation: escalationResult,
        // finalDecision,
        riskExplanation
    };
}

module.exports = analyzePackage