const http = require("http");
const { FINAL_DECISION } = require("../core/finalDecision.builder");

function callLLM(prompt) {

  if(process.env.DISABLE_AI === "true"){
    return Promise.reject(new Error("AI_DISABLED"));
  }

  // const isDocker = process.env.RUNNING_IN_DOCKER === "true";
  // const host=isDocker ? "host.docker.internal" :  "127.0.0.1";

  const host=process.env.RUNNING_IN_DOCKER === "true" ? "ollama" : "127.0.0.1";
  const port=Number(process.env.OLLAMA_PORT) || 11434;

  


  return new Promise((resolve, reject) => {
    let finished = false
    // let body="";
    const payload = JSON.stringify({
      model: "phi3:mini",
      prompt,
      stream: true,
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
        let fullResponse ="";
        
        // res.setEncoding("utf8");

        res.on("data", (chunk) => {
          const lines = chunk
          .toString()
          .split("\n")
          .filter(Boolean);

          for(const line of lines){
            try{
              const parsed = JSON.parse(line);
              if(parsed.response){
                fullResponse+=parsed.response;
              }
            }catch{}
          }
        });

        res.on("end", () => {
          if(finished)  return;
          finished = true;
        
          if(!fullResponse.trim()){
            return reject(new Error("EMPTY_LLM_RESPONSE"));
          }
          resolve(fullResponse.trim());
        });
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