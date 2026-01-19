// const POLICIES = require("./escalationPolicy.config");

// function evaluateEscalation(dependencies = []){
//     let vulnHigh = 0;
//     let vulnMedium = 0;
//     let licenseHigh=0;
//     let licenseMedium=0;

//     dependencies.forEach(dep => {
//         if(dep.riskLevel === "high")    vulnHigh++;
//         if(dep.riskLevel === "medium")  vulnMedium++;

//         if(dep.licenseRisk === "high")  licenseHigh++;
//         if(dep.licenseRisk === "medium")    licenseMedium++;
//     });

//     if(vulnHigh >= POLICIES.BLOCK.vulnHigh || licenseHigh >= POLICIES.BLOCK.license.high){
//         return{
//             escalationLevel: "BLOCK",
//             reason: "Critical security or legal risk detected."
//         };
//     }

//     if(vulnMedium >= POLICIES.WARN.vulnerability.medium || licenseMedium >= POLICIES.WARN.license.medium){
//         return{
//             escalationLevel:"WARN",
//             reason: "Moderate risk requires review."
//         }
//     };

//     return{
//         escalationLevel: "PASS",
//         reason: "Risk levels are within acceptable thresholds."
//     };
// }

// module.exports = {evaluateEscalation};


// const RULES = require("./escalationrules");
// const {ESCALATION_LEVELS} = require("./escalation.constants");


// function evaluateEscalation(allDependencies = []){
//     const reasons = [];
//     let finalDecision = ESCALATION_LEVELS.INFO;

//     for(const dep of allDependencies){
//         if(!dep.vulnerable || !dep.vulnerabilities?.length) continue;

//         for(const vuln of dep.vulnerabilities){
//             for(const rule of Object.values(RULES)){
//                 if(vuln.severity === rule.severity && dep.dependencyType === rule.apliesTo){
//                     reasons.push({
//                         type:"VULNERABILITY",
//                         dependency: dep.name,
//                         dependencyType: dep.dependencyType,
//                         severity: vuln.severity,
//                         rule: rule.decision,
//                         message:   `${vuln.severity} vulnerability detected in ${dep.name}`
//                     });
//                     if(rule.decision === ESCALATION_LEVELS.BLOCK){
//                         finalDecision = ESCALATION_LEVELS.BLOCK;
//                     }else if(rule.decision === ESCALATION_LEVELS.WARN && finalDecision !== ESCALATION_LEVELS.BLOCK){
//                         finalDecision = ESCALATION_LEVELS.WARN;
//                     }
//                 }
//             }
//         }
//     }

//     return {
//         decision: finalDecision,
//         reasons
//     };
// }

// module.exports = {evaluateEscalation};


// not gonna use this file at all

const escalationRules = require("./escalationrules");
const {ESCALATION_ACTIONS} = require("./escalation.constants");

function evaluateEscalation(dependencies = []){
    let projectDecision = ESCALATION_ACTIONS.ALLOW;
    const triggeredDependencies = [];

    const sortedRules = [...escalationRules].sort((a,b) => (b.priority || 0) - (a.priority || 0));

    for(const dep of dependencies){
        let depFinalAction = ESCALATION_ACTIONS.ALLOW;
        const depTriggeredRules = [];

        for(const rule of sortedRules){
            if(rule.condition(dep)){
                depTriggeredRules.push({
                    rule: rule.name,
                    action: rule.action,
                    reason: rule.reason
                });

            if(rule.action === ESCALATION_ACTIONS.BLOCK){
                depFinalAction = ESCALATION_ACTIONS.BLOCK;
                break;
            }

            if(rule.action === ESCALATION_ACTIONS.WARN && depFinalAction !== ESCALATION_ACTIONS.BLOCK){
                depFinalAction = ESCALATION_ACTIONS.WARN;
            }
        }
     }

     if(depFinalAction !== ESCALATION_ACTIONS.ALLOW){
        triggeredDependencies.push({
            dependency: dep.name,
            dependencyType: dep.dependencyType,
            finalAction: depFinalAction,
            triggeredRules: depTriggeredRules
        });
     }

     if(depFinalAction === ESCALATION_ACTIONS.BLOCK){
        projectDecision = ESCALATION_ACTIONS.BLOCK;
     }else if(depFinalAction === ESCALATION_ACTIONS.WARN && projectDecision !== ESCALATION_ACTIONS.BLOCK){
        projectDecision = ESCALATION_ACTIONS.WARN;
     }
}
    return {
        decision: projectDecision,
        triggeredDependencies
    }
}
module.exports = {evaluateEscalation}