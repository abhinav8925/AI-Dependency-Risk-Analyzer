const http = require("http");

function callLLM(prompt) {
  return new Promise((resolve, reject) => {
    // const payload = JSON.stringify({
    //   model: "llama3",
    //   prompt,
    // //   stream: false,
    //   options: {
    //     num_predict: 120
    //   }
    // });

    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 11434,
        path: "/api/generate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        //   "Content-Length": Buffer.byteLength(payload)
        },
        timeout: 30000
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk.toString()
        });

        res.on("end", () => {
          try {
            const json=JSON.parse(data);
            
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

    req.on("error", reject);
    req.write(JSON.stringify({
        model: "llama3",
        prompt,
        stream:false,
        options:{
            num_predict:120
        }
    }));
    req.end();
  });
}

module.exports = { callLLM };