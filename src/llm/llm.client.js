const http = require("http");

function callLLM(prompt) {
  return new Promise((resolve, reject) => {
    let finished = false;

    const payload = JSON.stringify({
      model: "llama3",
      prompt,
      stream: false,
      options: {
        num_predict: 180
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
        timeout: 60000
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk
        });

        res.on("end", () => {
          if(finished)  return;
          finished=true;
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
      }
    );

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Ollama timeout"));
    });
    req.on("error",(err)=>{
      if(!finished)  return;
      finished=true;
      reject(err)
    })
    req.write(payload);
    req.end();
  });
}

module.exports = { callLLM };