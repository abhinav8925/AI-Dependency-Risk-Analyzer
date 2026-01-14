function generateRiskExplanation(projectRisk){
    const {severity, breakdown, totalDependencies} = projectRisk;

    switch(severity){
        case "DANGEROUS":
            return `Project is classified as DANGEROUS due to the presence of ${breakdown.high} high-risk dependency and ${breakdown.medium} medium-risk dependencies. Immediate remedation is recommended.`;
        
        case "HIGH":
            return `Project has elevated risk with ${breakdown.high} 
            high-risk and ${breakdown.medium} medium-risk dependencies. Address high-risk packages promptly.`;
        
        case "MODERATE":
            return `Project shows moderate risk with ${breakdown.medium} medium-risk dependencies. Monitoring and gradual fixes are advised`;
        
        case "LOW":
            return `Project risk is low. All${totalDependencies} dependencies appear stable with no critical threats detected.`;

        default: 
            return "Risk level could not be determined due to insufficient data.";
    }
}

module.exports = generateRiskExplanation;