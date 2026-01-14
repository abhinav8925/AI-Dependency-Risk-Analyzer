function overrideRiskByVulnerability(vulnerabilities=[], currentRisk){
    let finalRisk = currentRisk;

    for(const v of vulnerabilities){
        if(v.severity === "CRITICAL" || v.severity === "HIGH"){
            return "high";
        }
        if(v.severity === "MEDIUM" && finalRisk !== "high"){
            finalRisk = "medium";
        }
    }
    return finalRisk;
}

module.exports = {overrideRiskByVulnerability};