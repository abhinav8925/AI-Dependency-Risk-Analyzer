function applyRiskPolicies(projectRisk={}){

    const breakdownn = projectRisk.breakdownn || {low:0, medium:0, high: 0};

    let severity = projectRisk.severity || "LOW";
    let score = projectRisk.score || 0;

    if(breakdownn.high >= 3){
        severity = "CRITICAL";
        score+=20;
    }
    else if(breakdownn.high >=1 ){
        severity="HIGH";
        score+=10;
    }
    if(breakdownn.medium >= 5 && severity === "LOW"){
        severity="MODERATE";
        score+=5;
    }

    return {
        ...projectRisk,
        severity,
        score
    };
}

module.exports = applyRiskPolicies;