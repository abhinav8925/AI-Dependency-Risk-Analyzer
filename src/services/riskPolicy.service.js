function applyRiskPolicies(projectRisk){
    let {severity, breakdown} = projectRisk;

    if(breakdown.high >0)
            severity = "DANGEROUS";
    else if(breakdown.medium >=3)
            severity = "MODERATE";
    
    return {
        ...projectRisk,
        severity
    };
}

module.exports = applyRiskPolicies;