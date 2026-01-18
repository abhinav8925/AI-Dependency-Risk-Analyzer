function generateSignals(dep){
    const signals = [];
    const name = typeof dep?.name === "string" ?dep.name: "";
    const version = typeof dep?.version === "string"?dep.version.toLowerCase(): "";
    const riskLevel = dep?.riskLevel;

    if(version.includes ("alpha") || version.includes("beta"))
        signals.push("Unstable pre-release version");
    if(name.length > 0 && name.length <= 3)
        signals.push("Very short package name (possible typo-squatting risk)");
    if(riskLevel === "high")
            signals.push("High overall risk based on vulnerability and version analysis.")
    
    return signals;
}

module.exports = generateSignals;