const analysisStore=new Map();

function saveAnalysis(id,data){
    analysisStore.set(id,data);
}
function getAnalysis(id){
    return analysisStore.get(id);
}

module.exports = {
    saveAnalysis,
    getAnalysis
}