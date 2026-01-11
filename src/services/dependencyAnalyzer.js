function analyzeDependencies(dependencies={}){

    const analyzedDependencies = [];

    for(const [name, version] of Object.entries(dependencies)){
        let risklevel = "low";
        if(version.includes("^") || version.includes("~")){
            risklevel = "medium";
        }
        if(version==="*" || version === "latest")
                risklevel = "high";
        
        let riskScore =0;
        if(risklevel === "low") riskScore =1;
        if(risklevel === "medium") riskScore =5;
        if(risklevel === "high") riskScore = 10;
        
        analyzedDependencies.push({
            name, 
            version,
            risklevel,
            riskScore
        });
    }
    return analyzedDependencies;
}

module.exports = analyzeDependencies;