function withTimeout(promise, ms){
    return Promise.race([
        promise,
        new Promise((_,reject) => setTimeout(() => reject(new Error("AI_TIMEOUT")),ms))
    ]);
}

module.exports = {withTimeout}