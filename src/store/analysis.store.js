const analysisStore=new Map();

function saveAnalysis(id,data){
    analysisStore.set(id,{
        data,
        explanation:null,
        status:"PENDING"
    });
}

function getAnalysis(id){
    return analysisStore.get(id);
}

function saveExplanation(id, explanation){
    const entry = analysisStore.get(id);
    if(!entry)  return;
    entry.explanation = explanation;
    entry.status="READY";
}


module.exports = {
    saveAnalysis,
    getAnalysis,
    saveExplanation
};