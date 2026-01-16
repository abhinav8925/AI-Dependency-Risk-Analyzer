const generateRiskExplanation = require("./riskExplanation.service");
const analyzeDependencies = require("../utils/dependencyAnalyzer");
const { calculateProjectRisk } = require("./projectRisk.service");
const applyRiskPolicies =require("./riskPolicy.service");
const calculateProjectSeverity = require ("../utils/projectSeverity")
const {evaluateProjectPolicy} = require("./policyEngine.service");
const {evaluateEscalation} = require("../engines/escalation/escalation.engine")


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
    const analyzedDeps = analyzeDependencies(dependencies);
    const analyzedDevDeps = analyzeDependencies(devDependencies);

    const allAnalyzedDeps = [...analyzedDeps, ...analyzedDevDeps];
    const escalation = evaluateEscalation(allAnalyzedDeps);

    const dependencyStats = buildRiskStats(analyzedDeps)
    const devDependencyStats = buildRiskStats(analyzedDevDeps)

    const projectRisk = calculateProjectRisk(dependencyStats,devDependencyStats);
    const policyAdjustedRisk = applyRiskPolicies(projectRisk);
    const policyResult = evaluateProjectPolicy(allAnalyzedDeps);


   
    const riskExplanation = generateRiskExplanation(policyAdjustedRisk);
    


    const totalHigh = dependencies.high + devDependencies.high;
    const totalMedium = dependencies.medium + devDependencies.medium;
    const totalLow = dependencies.low + devDependencies.low;


    
    return {
        dependencies: dependencyStats,
        devDependencies: devDependencyStats,
        projectRisk:policyAdjustedRisk,
        policy: policyResult,
        escalation,
        riskExplanation
    };
}

module.exports = analyzePackage