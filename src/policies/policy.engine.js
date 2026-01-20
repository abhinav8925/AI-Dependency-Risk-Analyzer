const DEFAULT_POLICY = require("./default.policy");

function evaluatePolicy(escalationResults, policy=DEFAULT_POLICY){
    let finalAction = "ALLOW";
    const violations = [];

    if(!escalationResults || !Array.isArray(escalationResults.triggeredDependencies)){
        return{
            // finalAction,
            violations,
            summary: {blocked: 0, warnings: 0}
        };
    }

    for(const dep of escalationResults.triggeredDependencies){
        for (const rule of dep.triggeredRules){
            const{rule:ruleName, action, reason} = rule;

                if(action === "block" && (ruleName === "HIGH_VULN_PROD_DEP" && policy.blockOn.highVulnProd) || (rule === "FORBIDDEN_LICENSE" && policy.blockOn.forbiddenLicense)){
                    finalAction="BLOCK";
                    violations.push({rule:ruleName, action:"BLOCK", reason, dependency:dep.dependency});
                }
                
                if(action === "warn" && ((ruleName === "HIGH_VULN_DEV_DEP" && policy.warnOn.highvulnDev) || (ruleName === "MEDIUM_LICENSE_RISK" &&  policy.warnOn.mediumLicense) || (ruleName === "HIGH_RISK_SCORE" && policy.warnOn.highRiskScore))){
                            if(finalAction !== "BLOCK"){
                                finalAction = "WARN";
                            }
                            violations.push({rule:ruleName, action:"WARN", reason, dependency:dep.dependency});
                }        
        }
    }
 

    

    return {
        // finalAction,
        violations,
        summary:{
            blocked: violations.filter(v=>v.action === "BLOCK").length,
            warnings: violations.filter(v=>v.action === "WARN").length
        },
    };
}

module.exports = {evaluatePolicy};