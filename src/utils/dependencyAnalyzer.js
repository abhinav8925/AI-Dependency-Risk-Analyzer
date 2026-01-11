const {calculateProjectRisk} = require("../services/projectRisk.service.js")

function analyzeDependencies(dependencies = {}) {
    const result = [];

    for (const [name, version] of Object.entries(dependencies)) {
        let riskLevel = "low";

        if (version.includes("alpha") || version.includes("beta")) {
            riskLevel = "high";
        } else if (version.startsWith("^0")) {
            riskLevel = "medium";
        }
        let riskScore = 0;

        if (riskLevel === "low") riskScore = 1;
        if (riskLevel === "medium") riskScore = 5;
        if (riskLevel === "high") riskScore = 10;


        result.push({
            name,
            version,
            riskLevel,
            riskScore
        });
    }

    return result;
}

module.exports = analyzeDependencies;
