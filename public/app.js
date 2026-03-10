async function analyze(){

const fileInput = document.getElementById("fileInput")

if(!fileInput){
alert("File input element not found.")
return
}

const file = fileInput.files[0]

if(!file){
alert("Please upload package.json")
return
}

const formData = new FormData()
formData.append("file", file)

const res = await fetch("/analyze",{
method:"POST",
body:formData
})

const text = await res.text()

let data

try{
data = JSON.parse(text)
}catch(err){
console.error("Invalid JSON response",text)
alert("Server error")
return
}

renderResult(data)

}

function demo(){

const example = {
data:{
summary:{
riskScore:42.6,
riskSeverity:"HIGH",
totalDependencies:5
},
finalDecision:{
action:"BLOCK"
},
decisionExplanation:{
primaryReason:"High severity vulnerabilities detected in production dependencies.",
blockedDependencies:["lodash"],
recommendedActions:["Upgrade lodash to latest version"]
},
analysis:{
dependencies:{
analyzed:[
{name:"express",version:"4.16.0",riskLevel:"medium",license:"MIT"},
{name:"lodash",version:"4.17.15",riskLevel:"high",license:"MIT"},
{name:"dotenv",version:"16.0.0",riskLevel:"medium",license:"UNKNOWN"}
]
},
devDependencies:{
analyzed:[
{name:"eslint",version:"6.0.0",riskLevel:"medium",license:"UNKNOWN"},
{name:"nodemon",version:"2.0.0",riskLevel:"medium",license:"UNKNOWN"}
]
}
}
}
}

renderResult(example)

}

function renderResult(data){

const container = document.getElementById("result")

const summary = data.data.summary
const decision = data.data.finalDecision
const explanation = data.data.decisionExplanation

const dependencies = data.data.analysis.dependencies.analyzed
const devDependencies = data.data.analysis.devDependencies.analyzed

let html = `

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"><div class="bg-red-600 p-4 rounded-lg text-center">
<h3 class="text-lg font-bold">Risk Score</h3>
<p class="text-2xl">${summary.riskScore}</p>
</div><div class="bg-yellow-500 p-4 rounded-lg text-center">
<h3 class="text-lg font-bold">Severity</h3>
<p class="text-xl">${summary.riskSeverity}</p>
</div><div class="bg-blue-500 p-4 rounded-lg text-center">
<h3 class="text-lg font-bold">Dependencies</h3>
<p class="text-xl">${summary.totalDependencies}</p>
</div><div class="bg-purple-600 p-4 rounded-lg text-center">
<h3 class="text-lg font-bold">Decision</h3>
<p class="text-xl">${decision.action}</p>
</div></div><div class="bg-slate-800 p-6 rounded-lg mb-6"><h2 class="text-xl font-bold mb-3">Security Explanation</h2><p class="mb-4">${explanation.primaryReason}</p><h3 class="font-semibold">Blocked Dependencies</h3><ul class="list-disc ml-6 mb-4">
${explanation.blockedDependencies.map(d=>`<li>${d}</li>`).join("")}
</ul><h3 class="font-semibold">Recommended Actions</h3><ul class="list-disc ml-6">
${explanation.recommendedActions.map(a=>`<li>${a}</li>`).join("")}
</ul></div><h2 class="text-2xl font-bold mb-4">Dependency Analysis</h2><table class="w-full bg-slate-800 rounded-lg overflow-hidden"><tr class="border-b border-slate-700">
<th class="p-3 text-left">Package</th>
<th class="p-3 text-left">Version</th>
<th class="p-3 text-left">Risk</th>
<th class="p-3 text-left">License</th>
</tr>`

dependencies.forEach(pkg=>{

const color =
pkg.riskLevel==="high"
?"text-red-400"
:pkg.riskLevel==="medium"
?"text-yellow-400"
:"text-green-400"

html+=`

<tr class="border-b border-slate-700">
<td class="p-3">${pkg.name}</td>
<td class="p-3">${pkg.version}</td>
<td class="p-3 ${color} font-semibold">${pkg.riskLevel}</td>
<td class="p-3">${pkg.license}</td>
</tr>`

})

devDependencies.forEach(pkg=>{

const color =
pkg.riskLevel==="high"
?"text-red-400"
:pkg.riskLevel==="medium"
?"text-yellow-400"
:"text-green-400"

html+=`

<tr class="border-b border-slate-700">
<td class="p-3">${pkg.name} (dev)</td>
<td class="p-3">${pkg.version}</td>
<td class="p-3 ${color} font-semibold">${pkg.riskLevel}</td>
<td class="p-3">${pkg.license}</td>
</tr>`

})

html+="</table>"

container.innerHTML = html

}