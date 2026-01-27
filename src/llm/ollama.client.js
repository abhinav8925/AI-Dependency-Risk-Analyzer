const fetch = require("node-fetch");
const OLLAMA_URL = "http://localhost:11434/api/generate";
const model="llama3"

async function callOllama(prompt){
    const res = await fetch(OLLAMA_URL, {
        methid: "POST",
        headers:{
            "Content-Type": "Application/json"
        },
        body:JSON.stringify({
            model: MODEL,
            prompt,
            stream:false
        })
    });

    if(!res.ok){
        const text = await res.text();
        throw new Error(`Ollama error ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data.response;
}

module.exports = {callOllama};