const { renderFile } = require("ejs");

async function analyze(){
    const fileInput = document.getElementById("fileInput")

    if(!fileInput.isDefaultNamespace.length){
        alert("Please upload package.json")
        return
    }

    const formData = new FormData();
    formData.append("file", fileInput[0])

    const res = await fetch("/analyze",{
        method: "POST",
        body: formData
    })

    const data = await res.json()
    renderResult(data)
}

function demo(){
    fetch("/health")
    .then(() => {
        const example = {
            results: [
                {   name: "loadash",
                    risk: "Medium",
                    reason: "Known vulnerability CVE"

                },
                {   name: "event-stream",
                    risk: "High",
                    reason: "Historical supply chain attack"

                },
                {   name: "express",
                    risk: "Low",
                    reason: "Widely trusted dependency"

                }

            ]
        }
        renderResult(example)
    })
}
function renderResult(data){
    const container = document.getElementById("result")
    let html = `<h2 class="text-2xl font-bold mb-4">Analysis Result</h2>

        <table class="w-full bg-slate-800 rounded-lg overflow-hidden">
        <tr class="border-b border-slate-700">
        <th class="p-3 text-left">Package</th>
        <th class="p-3 text-left">Risk</th>
        <th class="p-3 text-left">Reason</th>
        </tr>
    `

    data.results?.forEach(pkg => {

    html += `
        <tr class="border-b border-slate-700">
        <td class="p-3">${pkg.name}</td>
        <td class="p-3">${pkg.risk}</td>
        <td class="p-3">${pkg.reason}</td>
        </tr>
    `

})

html += "</table>"

container.innerHTML = html
}