function calculateProjectRisk(depStats, devDepStats){
    
    const allDeps = [
        ...depStats.analyzed,
        ...devDepStats.analyzed
    ];
    
    let score = 0;

    let breakdown= {low : 0, medium :0, high : 0, critical:0}

    let hasCriticalVuln = false;
    let hasHighVuln = false;

    for(const dep of allDeps){
        // score += dep.riskScore;
        // breakdown[dep.riskLevel]++;

        if(dep.vulnerable && dep.vulnerabilities?.length){
            for(const vuln of dep.vulnerabilities){
                if(vuln.severity === "HIGH"){
                    breakdown.high++;
                    score+=vuln.cvssScore || 8;
                    hasHighVuln = true;    
                }
                if(vuln.severity === "CRITICAL"){
                    breakdown.critical++;
                    score+=vuln.cvssScore || 10;
                    hasCriticalVuln = true;
                }
        }
    }else{
            const riskScore = dep.riskScore ?? (dep.riskLevel === "high" ? 10: dep.riskLevel === "medium" ? 5:1);
            score+=riskScore;

            if(dep.riskLevel){
                breakdown[dep.riskLevel]++;
            }
        }
    }
    


    let  severity = "LOW";
    

    if(hasCriticalVuln) severity = "CRITICAL";
    else if(hasHighVuln)  severity = "HIGH";
    else if(breakdown.medium>=3)  severity = "MODERATE";
    

    return {
        totalDependencies:allDeps.length,
        score,
        severity,
        breakdown
    };
}

module.exports = {calculateProjectRisk};