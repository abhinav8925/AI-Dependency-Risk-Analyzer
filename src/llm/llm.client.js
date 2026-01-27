
const {callOllama} = require("./ollama.client");
const LLM_PROVIDER = process.env.LLM_PROVIDER || "ollama";

async function callLLM(messages){
    const userMessage = messages.filter(m=>m.role === "user").map(m=>m.content).join("\n");

    if(LLM_PROVIDER === "ollama"){
        return callOllama("No valid LLM provider configured.");
    }
}

module.exports = {callLLM}
