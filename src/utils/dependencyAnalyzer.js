const generateSignals = require("../services/dependencySignal.service")
function analyzeDependencies(dependencies={}){

    // console.log("🔥 DEPENDENCY ANALYZER FILE LOADED 🔥");
    const analyzedDependencies = [];

    for(const [name, version] of Object.entries(dependencies)){
        let riskLevel = "low";
        if(version.includes("^") || version.includes("~")){
            riskLevel = "medium";
        }
        if(version==="*" || version === "latest")
                riskLevel = "high";
        
        let riskScore =0;
        if(riskLevel === "low") riskScore =1;
        if(riskLevel === "medium") riskScore =5;
        if(riskLevel === "high") riskScore = 10;
        


        // console.log("SIGNAL INPUT -> ", {name, version, riskLevel});
        
        const signals = generateSignals({
            name, version, riskLevel
        });
        
        analyzedDependencies.push({
            name, 
            version,
            riskLevel,
            riskScore,
            signals
        });
    }
    return analyzedDependencies;
}

module.exports = analyzeDependencies;