function calculateProjectSeverity({high, medium, low}){

    if(high >= 2)   return "CRITICAL";
    if(high === 1)  return "HIGH";
    if(medium >= 3) return "MODERATE";

    return "LOW";
}

module.exports = calculateProjectSeverity;