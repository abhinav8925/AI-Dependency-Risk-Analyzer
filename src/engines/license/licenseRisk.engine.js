const LICENSE_RULES = require("./licenseRules.config");

function evaluateLicenseRisk(license){
    if(LICENSE_RULES.HIGH_RISK.includes(license)){
        return{
            licenseRisk: "high",
            reason: "Strong copyleft license may require source disclosure."
        };
    }

    if(LICENSE_RULES.MEDIUM_RISK.includes(license)){
        return{
            licenseRisk: "medium",
            reason: "Weal copyleft license with conditional obligations."
        };
    }

    if(LICENSE_RULES.LOW_RISK.includes(license)){
        return{
            licenseRisk: "low",
            reason: "Permissive license with minimal restrictions."
        };
    }

    return {
        licenseRisk: "medium",
        reason: "Unknown or custom license requires manual review."
    };
}

module.exports = {evaluateLicenseRisk}