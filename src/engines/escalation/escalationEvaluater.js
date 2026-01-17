const escalationRules = require("./escalationrules");
const {ESCALATION_ACTIONS} = require("./escalation.constants");
// const { evaluateLicenseRisk } = require("../license/licenseRisk.engine");

function evaluateEscalation(dependencies = []){

    let finalAction = ESCALATION_ACTIONS.ALLOW;

    // const triggeredRules = [];
    const escalationMap = new Map();

    for(const dep of dependencies){
        const key = `${dep.name}:${dep.dependencyType}`;

        for(const rule of escalationRules){
            if(!rule.condition(dep))    continue;

            if(!escalationMap.has(key)){
                escalationMap.set(key,{
                    dependency: dep.name,
                    dependencyType: dep.dependencyType,
                    finalAction:ESCALATION_ACTIONS.ALLOW,
                    triggeredRules:[]
                });
            }

            const entry = escalationMap.get(key);

            entry.triggeredRules.push({
                rule:rule.name,
                action: rule.action,
                reason: rule.reason
            });

            if(rule.action === ESCALATION_ACTIONS.BLOCK){
                    entry.finalAction = ESCALATION_ACTIONS.BLOCK;
                    finalAction = ESCALATION_ACTIONS.BLOCK;
            }else if(rule.action === ESCALATION_ACTIONS.WARN && entry.finalAction !== ESCALATION_ACTIONS.BLOCK){
                    entry.finalAction = ESCALATION_ACTIONS.WARN;
                    if(finalAction !== ESCALATION_ACTIONS.BLOCK){
                        finalAction=ESCALATION_ACTIONS.WARN;
                }
            }
            
        }
    }

    return {
        decision: finalAction,
        triggeredDependencies: Array.from(escalationMap.values())
    };
}

module.exports = {evaluateEscalation};