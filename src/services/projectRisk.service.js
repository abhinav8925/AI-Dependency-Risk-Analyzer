function calculateProjectRisk(depStats, devDepStats){
    
    const allDeps = [
        ...depStats.analyzed,
        ...devDepStats.analyzed
    ];
    
    let score = 0;

    let breakdown= {low : 0, medium :0, high : 0}

    for(const dep of allDeps){
        score += dep.riskScore;
        breakdown[dep.riskLevel]++;
    }
    


    let  severity = "LOW";
    

    if(breakdown.high>=2) severity = "CRITICAL";
    else if(breakdown.high == 1)  severity = "HIGH";
    else if(breakdown.medium>=3)  severity = "MODERATE";
    

    return {
        totalDependencies:allDeps.length,
        score,
        severity,
        breakdown
    };
}

module.exports = {calculateProjectRisk};