function generateSignals(dep){

    // console.log("SIGNAL SERVICE HIT →", dep);
 


    const signals = [];
    if(dep.version.includes ("alpha") || dep.version.includes("beta"))
        signals.push("Unstable pre-release version");
    if(dep.name.length <=3)
        signals.push("SHort package name (possible typo-squat)");
    if(dep.riskLevel === "high")
            signals.push("High severity based on versioning")
    
    return signals;
}

module.exports = generateSignals;