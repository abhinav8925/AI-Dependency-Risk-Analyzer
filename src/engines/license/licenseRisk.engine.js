const LICENSE_RULES = require("./licenseRules.config");

const LICENSE_RISK_LEVELS = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low"
}

function evaluateLicenseRisk(license){

    const normalizedLicense = typeof license === "string"?license.toUpperCase():"UNKNOWN";

    if(LICENSE_RULES.HIGH_RISK.includes(normalizedLicense)){
        return{
            licenseRisk: LICENSE_RISK_LEVELS.HIGH,
            reason: "Strong copyleft license may require source disclosure."
        };
    }

    if(LICENSE_RULES.MEDIUM_RISK.includes(normalizedLicense)){
        return{
            licenseRisk: LICENSE_RISK_LEVELS.MEDIUM,
            reason: "Weal copyleft license with conditional obligations."
        };
    }

    if(LICENSE_RULES.LOW_RISK.includes(normalizedLicense)){
        return{
            licenseRisk: LICENSE_RISK_LEVELS.LOW,
            reason: "Permissive license with minimal restrictions."
        };
    }

    return {
        licenseRisk: LICENSE_RISK_LEVELS.MEDIUM,
        reason: "Unknown or custom license requires manual review."
    };
}

module.exports = {evaluateLicenseRisk}