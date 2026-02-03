const http = require("http");
// const { reject } = require("lodash");
// const { finished } = require("stream");

function callLLM(prompt) {
  return new Promise((resolve, reject) => {
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
        timeout: 20000
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {body += chunk});

        res.on("end", () => {
            try {
              const json=JSON.parse(body);
              if (!json.response) {
                return reject(new Error("Empty Ollama response"));
              }
              resolve(json.response);
            } catch (e) {
              reject(e);
            }
          });
      });
     
    req.on("timeout", ()=>{
    req.destroy();
    reject(new Error("Ollama timeout"));
  });

  req.on("error",reject);
  req.write(payload);
  req.end();
});
}
module.exports = { callLLM };