function withTimeout(promise, {timeoutMs}){
    return Promise.race([
        promise,
        new Promise((_,reject) => setTimeout(() => reject(new Error("AI_TIMEOUT")),timeoutMs))
    ]);
}

module.exports = {withTimeout}