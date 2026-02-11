const http = require("http");
const { FINAL_DECISION } = require("../core/finalDecision.builder");

function callLLM(prompt) {

  if(process.env.DISABLE_AI === "true"){
    return Promise.reject(new Error("AI_DISABLED"));
  }

  const isDocker = process.env.RUNNING_IN_DOCKER === "true";
  const host=isDocker ? "host.docker.internal" :  "127.0.0.1";
  const port=Number(process.env.OLLAMA_PORT) || 11434;

  


  return new Promise((resolve, reject) => {
  
    let body="";
    const payload = JSON.stringify({
      model: "llama3",
      prompt,
      stream: false,
      options: {
        num_predict: 120,
        temperature: 0.4
      }
    });  
    const req = http.request(
      {
        hostname: host,
        port,
        path: "/api/generate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        timeout: 30000
      },
      (res) => {
        
        res.setEncoding("utf8");
        res.on("data", (chunk) => {body += chunk});

        res.on("end", () => {
          try {
              const json = JSON.parse(body);
              if(!json.response){
                return reject(new Error ("EMPTY_LLM_RESPONSE"));
              }
              resolve(json.response.trim());
            } catch (e) {
              reject(e);
            }
          });
        });
    
  req.on("timeout",()=>{
    // if(finished)  return;
    // finished=true;
    req.destroy();
    reject(new Error ("LLM_TIMEOUT"))
  })
   

  req.on("error",reject);
  req.write(payload);
  req.end();
});
}
module.exports = { callLLM };