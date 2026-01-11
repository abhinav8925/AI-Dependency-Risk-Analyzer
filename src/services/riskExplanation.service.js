function generateRiskExplanation(projectRisk){
    const {severity, breakdown} = projectRisk;

    if(severity === "SAFE")
        return "This project is safe because all dependencies use stable versions with no high-risk indicators.";

    if(severity === "WARNING")
        return `This project has moderate risk due to  ${breakdown.medium} dependencies using potentially unstable versions.`;

    if(severity === "CRITICAL")
        return `This project is high risk because ${breakdown.high} dependencies use alpha or beta versions. Immediate review is recommended.`;

    return "Risk level could not be determined.";
}

module.exports = generateRiskExplanation;