const POLICIES = require("./escalationPolicy.config");

function evaluateEscalation(dependencies = []){
    let vulnHigh = 0;
    let vulnMedium = 0;
    let licenseHigh=0;
    let licenseMedium=0;

    dependencies.forEach(dep => {
        if(dep.riskLevel === "high")    vulnHigh++;
        if(dep.riskLevel === "medium")  vulnMedium++;

        if(dep.licenseRisk === "high")  licenseHigh++;
        if(dep.licenseRisk === "medium")    licenseMedium++;
    });

    if(vulnHigh >= POLICIES.BLOCK.vulnHigh || licenseHigh >= POLICIES.BLOCK.license.high){
        return{
            escalationLevel: "BLOCK",
            reason: "Critical security or legal risk detected."
        };
    }

    if(vulnMedium >= POLICIES.WARN.vulnerability.medium || licenseMedium >= POLICIES.WARN.license.medium){
        return{
            escalationLevel:"WARN",
            reason: "Moderate risk requires review."
        }
    };

    return{
        escalationLevel: "PASS",
        reason: "Risk levels are within acceptable thresholds."
    };
}

module.exports = {evaluateEscalation};