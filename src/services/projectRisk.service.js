const {evaluateEscalationPolicies} = require("./escalationPolicy.service");

function calculateProjectRisk(depStats, devDepStats){
    
    const allDeps = [
        ...depStats.analyzed,
        ...devDepStats.analyzed
    ];

    const violations = evaluateEscalationPolicies(allDeps);
    
    let score = 0;

    let breakdown= {low : 0, medium :0, high : 0, critical:0}

    let hasCriticalVuln = false;
    let hasHighVuln = false;
    let maxVulnSeverity = "LOW";

    for(const dep of allDeps){
        // score += dep.riskScore;
        // breakdown[dep.riskLevel]++;

        

        if(dep.vulnerable && dep.vulnerabilities?.length){
            for(const vuln of dep.vulnerabilities){
                
                if(vuln.severity === "CRITICAL"){
                    breakdown.critical++;
                    maxVulnSeverity = "CRITICAL";
                    score+=vuln.cvssScore || 10;
                    hasCriticalVuln = true;
                }
                if(vuln.severity === "HIGH" && maxVulnSeverity!=="CRITICAL"){
                    maxVulnSeverity="HIGH"
                    breakdown.high++;
                    score+=vuln.cvssScore || 8;
                    hasHighVuln = true;    
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
    


    let  riskSeverity = "LOW";
    

    // if(hasCriticalVuln) severity = "CRITICAL";
    // else if(hasHighVuln)  severity = "HIGH";
    // else if(breakdown.medium>=3)  severity = "MODERATE";
    
    

    if(maxVulnSeverity === "CRITICAL")  riskSeverity="CRITICAL";
    else if(maxVulnSeverity === "HIGH")  riskSeverity="HIGH";
    else if(breakdown.medium >= 3)  riskSeverity="MODERATE";

    
    let policySeverity = "LOW";

    if(violations.some(v => v.severity === "CRITICAL")) policySeverity = "CRITICAL";
    else if (violations.some(v => v.severity === "HIGH")) policySeverity = "HIGH";
    else if(violations.some(v =>v.severity === "MODERATE")) policySeverity = "MODERATE";

    const severityOrder = ["LOW", "MODERATE", "HIGH", "CRITICAL"]

    const severity = severityOrder[
        Math.max(
            severityOrder.indexOf(riskSeverity),
            severityOrder.indexOf(policySeverity)
        )
    ]
    return {
        totalDependencies:allDeps.length,
        score: Number(score.toFixed(1)),
        severity,
        policyViolations:violations
        // breakdown
    };
}

module.exports = {calculateProjectRisk};