const generateSignals = require("../services/dependencySignal.service")
const {findVulnerabilities} = require("../services/vulnerability.service");
const {overrideRiskByVulnerability} = require("../utils/riskEvaluator");
const {detectLicense} = require("../engines/license/licenseDetector.service");
const {evaluateLicenseRisk} = require("../engines/license/licenseRisk.engine");



function analyzeDependencies(dependencies={}, dependencyType="dependency"){

    
    const analyzedDependencies = [];

    for(const [name, version] of Object.entries(dependencies)){
        let baseRiskLevel = "low";
        const license = detectLicense(name);
        const {licenseRisk, reason} = evaluateLicenseRisk(license);
        if(version.includes("^") || version.includes("~")){
            baseRiskLevel = "medium";
        }
        if(version==="*" || version === "latest")
                baseRiskLevel = "high";


        
        
        
        const vulnerabilities = findVulnerabilities(name, version);
        let finalRiskLevel = baseRiskLevel;

        if(vulnerabilities.length > 0){
            const hasHigh = vulnerabilities.some(v=>v.severity === "HIGH");
            const hasMedium = vulnerabilities.some(v=> v.severity === "MEDIUM");

            if(hasHigh) finalRiskLevel = "high";
            else if(hasMedium && finalRiskLevel === "low") finalRiskLevel = "medium";
        }

        let riskScore =1;

        if(finalRiskLevel === "medium") riskScore =5;
        if(finalRiskLevel === "high") riskScore = 10;
    
        const signals = generateSignals({
            name, version, riskLevel:finalRiskLevel
        });
        
        analyzedDependencies.push({
            name, 
            version,
            dependencyType,
            riskLevel:finalRiskLevel,
            riskScore,
            // signals,
            // vulnerabilities
            vulnerable: vulnerabilities.length>0,
            vulnerabilities,
            license,
            licenseRisk,
            licenseReason: reason
        });
    }

    return analyzedDependencies;
}

module.exports = analyzeDependencies;