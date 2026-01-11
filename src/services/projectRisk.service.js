function calculateProjectRisk(depStats, devDepStats){
    
    const allDeps = [
        ...depStats.analyzed,
        ...devDepStats.analyzed
    ];
    
    let score = 0;

    let low = 0, medium =0, high = 0;

    allDeps.forEach(dep => {

        score += dep.riskScore;
        if(dep.riskLevel === "low") low++;
        if(dep.riskLevel === "medium") medium++;
        if(dep.riskLevel === "high") high++;
    });


    let  severity = "SAFE";
    if(score >= 30)    severity= "CRITICAL";
    else if(score >= 15) severity =  "WARNING";

    return {
        totalDependencies:allDeps.length,
        score: score,
        severity,
        breakdown : {
            low,
            medium,
            high
        }
    };
}

module.exports = {calculateProjectRisk};