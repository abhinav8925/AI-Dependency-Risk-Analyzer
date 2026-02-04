const http = require("http");
const { FINAL_DECISION } = require("../core/finalDecision.builder");
// const { reject } = require("lodash");
// const { finished } = require("stream");

function callLLM(prompt) {

  return new Promise((resolve, reject) => {
    let finished = false;
    const payload = JSON.stringify({
      model: "llama3",
      prompt,
      stream: false,
      options: {
        num_predict: 90
      }
    });

    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 11434,
        path: "/api/generate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {body += chunk});

        res.on("end", () => {
          if(finished) return
          finished = true;

          console.log("[OLLAMA] Raw response length:", body.length);

            try {
              const json=JSON.parse(body);
              if (!json.response) {
                return reject(new Error("Empty Ollama response"));
              }
              resolve(json.response.trim());
            } catch (e) {
              reject(e);
            }
          });
    res.on("close", ()=>{
      if(!finished){
        finished = true;
        reject (new Error("Ollama connection closed early"));
      }
    })  
  });   
   

  req.on("error",err =>{
    if(finished) return
    finished = true;
    reject(err);
  });
  req.write(payload);
  req.end();
});
}
module.exports = { callLLM };