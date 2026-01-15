const generateSignals = require("../services/dependencySignal.service")
const {findVulnerabilities} = require("../services/vulnerability.service");
const {overrideRiskByVulnerability} = require("../utils/riskEvaluator");

function analyzeDependencies(dependencies={}){

    // console.log("🔥 DEPENDENCY ANALYZER FILE LOADED 🔥");
    const analyzedDependencies = [];

    for(const [name, version] of Object.entries(dependencies)){
        let baseRiskLevel = "low";
        if(version.includes("^") || version.includes("~")){
            baseRiskLevel = "medium";
        }
        if(version==="*" || version === "latest")
                baseRiskLevel = "high";
        
        
        
        const vulnerabilities = findVulnerabilities(name, version);
        // const finalRiskLevel = overrideRiskByVulnerability(vulnerabilities, riskLevel);
        let finalRiskLevel = baseRiskLevel;

        if(vulnerabilities.length > 0){
            const hasHigh = vulnerabilities.some(v=>v.severity === "HIGH");
            const hasMedium = vulnerabilities.some(v=> v.severity === "MEDIUM");

            if(hasHigh) finalRiskLevel = "high";
            else if(hasMedium && finalRiskLevel === "low") finalRiskLevel = "medium";
        }

        let riskScore =1;

        if(finalRiskLevel === "medium") riskScore =5;
        if(finalRiskLevel === "high") riskScore = 10;

        // console.log("SIGNAL INPUT -> ", {name, version, riskLevel});
        
        
        const signals = generateSignals({
            name, version, riskLevel:finalRiskLevel
        });
        
        analyzedDependencies.push({
            name, 
            version,
            riskLevel:finalRiskLevel,
            riskScore,
            // signals,
            // vulnerabilities
            vulnerable: vulnerabilities.length>0,
            vulnerabilities
        });
    }
    return analyzedDependencies;
}

module.exports = analyzeDependencies;