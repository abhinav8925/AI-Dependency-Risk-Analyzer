const http = require("http");
// const { FINAL_DECISION } = require("../core/finalDecision.builder");

function callLLM(prompt) {

  if(process.env.DISABLE_AI === "true"){
    return Promise.reject(new Error("AI_DISABLED"));
  }

  const isDocker = process.env.RUNNING_IN_DOCKER === "true";
  const hostname=isDocker ? "host.docker.internal" : "127.0.0.1";
  // const port=;/

  return new Promise((resolve, reject) => {
    let finished = false
    
    const payload = JSON.stringify({
      model: "phi3:mini",
      prompt,
      stream: false,
      options: {
        num_predict: 120,
        // temperature: 0.4
      }
    });  
    const req = http.request(
      {
        hostname,
        port:Number(process.env.OLLAMA_PORT) || 11434,
        path: "/api/generate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        timeout: 30000
      },
      
      (res) => {
        let body = "";
        res.on("data",chunk =>body+=chunk);
        res.on("end",()=>{
          if(finished)  return;
          finished=true;

          const lines = body.split("\n").filter(Boolean);

          let full = "";
          for(const line of lines){
            try{
              const parsed = JSON.parse(line);
              if(parsed.response) full+=parsed.response;
            }catch{}
          }

          if(!full.trim())  return reject(new Error("EMPTY_RESPONSE"));
          resolve(full.trim());
        })
      })
    
      req.on("error",(err)=>{
        if(finished)  return;
        finished=true;
        reject(err);
      })
      req.write(payload);
        req.end();
      });
      }
module.exports = { callLLM };