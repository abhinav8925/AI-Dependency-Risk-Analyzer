// const poilicies = require("../policies/escalation.policy");

const e = require("express");

// function evaluateProjectPolicy(projectRisk){

//     let  {score, breakdown} = projectRisk;

//     if(breakdown.critical >= poilicies.FAIL.criticalVulns){
//         return policyResult("FAIL", "Critical vulnerabilites detected");
//     }

//     if(breakdown.high >= poilicies.FAIL.highVulns){
//         return policyResult("FAIL", "Multiple high-severity vulnerabilites");
//     }

//     if(score >= poilicies.FAIL.maxScore){
//         return policyResult("FAIL", "Risk score exceeds safe threshold");
//     }

//     if(breakdown.high >= poilicies.WARN.highVulns || breakdown.medium >= poilicies.WARN.mediumVulns || score >= poilicies.WARN.maxScore){
//         return  policyResult ("WARN", "Project has elevated security risk");
//     } 

//     return policyResult("PASS", "Project meets security standards");
// }

// function policyResult(status, reason){
//     return {
//         status,
//         reason,
//         timestamp: new Date().toISOString()
//     };
// }

// module.exports = {evaluateProjectPolicy};

function evaluateProjectPolicy(dependencies=[]){

    const escalation = {
        critical:0,
        high:0,
        medium:0,
        triggered: []
    };

    for(const dep of dependencies){
        if(!dep.vulnerabilities) continue;

        for(const vuln of dep.vulnerabilities){
            if(vuln.severity === "CRITICAL")    escalation.critical++;
            if(vuln.severity === "HIGH")    escalation.high++;
            if(vuln.severity === "MEDIUM")   escalation.medium ++;
        }
    }

    if(escalation.critical > 0)
            escalation.triggered.push("CRITICAL_VULNERABILITIES_PRESENT");
    if(escalation.high >= 2)
            escalation.triggered.push("MULTIPLE_HIGH_VULNERABILITIES");
    if(escalation.medium >= 5)
            escalation.triggered.push("EXCESSIVE_MEDIUM_VULNERABILITIES");
    
    return escalation;
}

module.exports = {evaluateProjectPolicy};