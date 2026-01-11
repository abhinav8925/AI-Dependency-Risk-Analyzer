// const server = http.createServer((req, res) => {
    // // console.log(req.method);
    // // console.log(req.url);
    // res.end("Hello AI")
    
    // res.end("Hello world, i am back");

    // if(req.url === "/")
    //     res.end("Home Page");
    // else if(req.url === "/about")
    //     res.end("About page")
    // else    
    //     res.end("404 Not found")

// });


// app.post("/upload", upload.single("file"), (req,res)=>{
    // const fpath = req.file.path;
    // const fcontent = fs.readFileSync(fpath, "utf-8");
    // console.log(fcontent);

//     console.log(req.file);
//     res.send("File received");
    

//     res.send("File received and read");
// });




// app.post("/app/data", (req, res)=>{
//     console.log(req.body);
//     res.send("Data Received");
    
// });

// app.get("/app/:name", (req, res) => {
//     console.log(req.params);
//     console.log(req.query);

//     res.send(`Name: ${req.params.name} and level: ${req.query.level}`)
    
    
// });

// app.post("/test", (req, res)=>{
//     console.log(req.body);
//     res.send("Data Received");
    
// })

// app.use((req, res, next) => {
//     console.log("Request Received: ", req.method, req.url);
//     next();    
// });


// app.get("/health",  (req, res) => {
//     res.send("OK");
// })

// app.get("/analyze", (req, res) => {
//     const file = fs.readFileSync("sample-package.json","utf-8");
//     const parsed = JSON.parse(file);

//     const dependencies = parsed.dependencies;
//     res.json({
//         project: parsed.name,
//         totalDependencies: Object.keys(dependencies).length,dependencies
//     });

//     // console.log(req.body);
//     // res.send("Data received");
// })


// app.post("/upload", upload.single("file"), (req, res) => {
//     // console.log(req.file);
    
//     const filePath = req.file.path;
//     const fileData = fs.readFileSync(filePath,"utf-8");
//     // console.log(fileData);

//     // res.send("File read successfully");

//     const parsedData = JSON.parse(fileData);
//     const dependencies = parsedData.dependencies || {};
//     const devDependencies = parsedData.devDependencies || {};

//     // console.log("Dependencies: ", dependencies);
//     // console.log("devDependencies: ", devDependencies);


const http = require("http");
const multer = require('multer');
const express = require('express')
const fs = require("fs");
const { version } = require("os");

const app = express();
const PORT = 3000;
const upload = multer({dest: "uploads/"});
const errorHandler = require("./src/middlewares/errorHandler");
const validateUpload = require("./src/middlewares/validateUpload")
const vulnerabilityDB = require("./src/data/vulnerabilityDB")
// const analyzeDependencies = require("./src/services/dependencyService")


app.use(express.json());
// app.use((req, res, next)=>{
//     console.log("Middleware Hit");
//     console.log("Method: ", req.method);
//     console.log("URL:", req.url);

//     req.requestTime = new Date().toISOString();
//     next();
    
// });

// app.get("/time", (req, res)=>{
//     res.send(`Request time: ${req.requestTime}`);
// })


// function checkAPIkey(req, res, next){
//     const apikey = req.query.key;

//     if(!apikey || apikey!="12345"){
//         return res.status(403).send("Access Denied: Invalid API Key");
//     }
//     next();
// }

// app.get("/secure-data", checkAPIkey, (Req, res) => {
//     res.send("You have accessed secure data");
// });

// app.post("/upload", upload.single("file"), validateUpload, (req, res,next ) => {
//     // console.log(req.file);

//     try{
//         if(!req.file){
//             const error = new Error("No file uploaded");
//             error.statusCode = 400;
//             return next(error);
//         }
//         res.json({
//             success: true,
//             file: req.file.originalname
//         });
//     }catch(error){
//         next(error);
//     }
    
    
//     const filePath = req.file.path;
//     const fileData = fs.readFileSync(filePath,"utf-8");
//     // console.log(fileData);

//     // res.send("File read successfully");

//     const parsedData = JSON.parse(fs.readFileSync(filePath,"utf-8"));
//     function normalizeDeps(deps, type){
//         return Object.entries(deps).map(([name, version])=> ({
//             name, 
//             version,
//             type
//         }))
//     }

//     function assessVersion(version){
//         if(!version || version === "*" || version === "latest")
//             return "CRITICAL";

//         if(version.startsWith("^") || version.startsWith("~"))
//             return "MEDIUM";

//         return "LOW";
//     }

//     function calculateProjectRisk(dependencies){
//         let score = 0;

//         for (const dep of dependencies){
//             if(dep.risk === "CRITICAL") score+=10;
//             else if(dep.risk === "MEDIUM") score+=5;
//             else score+=1;
//         }
//         return score;
//     }

//     function analyzeDependencyGroup(deps,type){
//         return Object.entries(deps).map(([name, version])=>({
//             name, 
//             version,
//             type,
//             risk:calculateProjectRisk(version),
//             recommendation: getRecommendation({version, risk:calculateProjectRisk(version)})
//         }));
//     }

//     function getRecommendation(dep){
//         if(dep.risk === "CRITICAL")
//             return "Upgrade to the latest stable version immediately.";
//         if(dep.risk === "MEDIUM")
//             return "Review changelog and plan an upgrade.";

//         return "No immediate action required.";
//     }

//     function adjustRisk(dep){
//         if(dep.type === "production" && dep.risk === "MEDIUM"){
//             return "CRITICAL";
//         }
//         return dep.risk;
//     }
    
//     const dependencies = parsedData.dependencies || {};
//     const devDependencies = parsedData.devDependencies || {};

//     const normalizedDependencies = normalizeDeps(dependencies, "dependency");
//     const normalizeddevDependencies = normalizeDeps(devDependencies, "devDependency");

//     const analyzedProdDeps = analyzeDependencyGroup(dependencies, "production");
//     const analyzedDevDeps = analyzeDependencyGroup(devDependencies, "development");


    
    
//     const allDependencies = [
//         ...analyzedProdDeps,
//         ...analyzedDevDeps
//     ]

//     const finalDependencies = allDependencies.map(dep =>({
//         ...dep,
//         risk: adjustRisk(dep)
//     }))

//     const analyzedDependencies = allDependencies.map(dep => ({
//         // ...dep,
//         name: dep.name,
//         version: dep.version,
//         risk: calculateProjectRisk(dep.version),
//         recommendation: getRecommendation(dep)
//     }));

//     const riskPriority = {
//         CRITICAL: 3,
//         MEDIUM: 2,
//         LOW: 1
//     };
//     analyzedDependencies.sort((a,b) =>{
//         return riskPriority[b.risk]-riskPriority[a.risk];
//     });
//     const projectRiskScore = calculateProjectRisk(analyzedDependencies);

    

    
//     // console.log(allDependencies);
    


// //     res.json({
// //     summary: {
// //         productionCount: analyzedProdDeps.length,
// //         devCount: analyzedDevDeps.length,
// //         criticalIssues: finalDependencies.filter(d => d.risk === "CRITICAL").length
// //     },
// //     dependencies: finalDependencies
// // });

// })

// app.post("/upload", upload.single("file"), (req, res, next) => {

//     try{
//         const filePath = req.file.path;
//         const filecontent = fs.readFileSync(filePath, "utf-8");
//         const parsedpackage = JSON.parse(filecontent);

//         const dependencies = parsedpackage.dependencies || {};
//         const devdependencies = parsedpackage.devdependencies || {};

//         // console.log(Object.keys(dependencies).length);
//         // console.log(Object.keys(devdependencies).length);

//          function calculateRisk(name, version){
//             if(version.includes("alpha") || version.includes("beta")){
//                 return {level: "high", reason: "Pre-release version"};
//             }
//             if(version.startsWith("^0.")){
//                 return {level: "medium", reason: "Unstable major version"};
//             }
//             return {level: "low", reason: "Stable release"}
//         }
//         const analyzedDependencies = [];
        
        
//         for (const [name, version] of Object.entries(dependencies)){
//             const vulnerability = checkvulnerability(name, version);
//             const risk = calculateRisk(name, version);
//             analyzedDependencies.push({
//                 name,
//                 version,
//                 type:"dependency",
//                 // risklevel: risk.level,
//                 risklevel: vulnerability ? vulnerability.severity: "low",
//                 cve: vulnerability?.cve || null,
//                 // reason: risk.reason
//                 reason: vulnerability?.reason || "No known vulnerabilty"
//             });
//         }

//         for (const [name, version] of Object.entries(devdependencies)){
//             const vulnerability = checkvulnerability(name, version);
//             const risk = calculateRisk(name, version);
//             analyzedDependencies.push({
//                 name,
//                 version,
//                 type:"devdependency",
//                 // risklevel: risk.level,
//                 risklevel: vulnerability ? vulnerability.severity: "low",
//                 cve: vulnerability?.cve || null,
//                 reason: vulnerability?.reason || "No known vulnerabilty"
//             });
//         }

//         function checkvulnerability(depName, depVersion){
//             const record = vulnerabilityDB[depName];
//             if(!record) return null;

//             if(record.vulnerableVersion.includes(depVersion)){
//                 return record;
//             }
//             return null;
//         }
        
//         let highRiskCount = 0;
//         let mediumRiskCount = 0;
//         let lowRiskCount = 0;

//         for (let i = 0; i < analyzedDependencies.length; i++) {
//             if (analyzedDependencies[i].risklevel === "high") highRiskCount++;
//             if (analyzedDependencies[i].risklevel === "medium") mediumRiskCount++;
//             if (analyzedDependencies[i].risklevel === "low") lowRiskCount++;
//         }

//         let vulnerableDependencies = [];
//         let safeDependencies =[];

//         for(let i=0;i<analyzedDependencies.length;i++){
//             if (analyzedDependencies[i].risklevel === "high" || analyzedDependencies[i].risklevel === "medium")
//                    vulnerableDependencies.push(analyzedDependencies[i]);
//             else 
//             safeDependencies.push(analyzedDependencies[i]);
            
//         }

//         return res.status(200).json({
//             success: true,
//             summary: {
//                 high: highRiskCount,
//                 medium: mediumRiskCount,
//                 low: lowRiskCount,
//                 total: analyzedDependencies.length
//             },
//            vulnerableDependencies, safeDependencies,
//             total: analyzedDependencies.length,analyzedDependencies

//         });
//     }catch(error){
//         next(error);
//     }
// });

// app.post("/analyze", upload.single("file"), (req, res, next)=>{
//     try{
//         const filePath = req.file.path;
//         const rawData = fs.readFileSync(filePath, "utf-8")
//         const parsedData = JSON.parse(rawData);
//         const dependencies = parsedData.dependencies || {};
//         const devdependencies = parsedData.devDependencies || {};
//         const analyzedDependencies = analyzeDependencies(dependencies);
//         const analyzeddevDependencies = analyzeDependencies(devdependencies);
        
//         let high = 0, medium = 0, low = 0;

//         analyzedDependencies.forEach(dep => {
//             if (dep.risklevel === "high") high++;
//             if (dep.risklevel === "medium") medium++;
//             if (dep.risklevel === "low") low++;
//         });

//         let dhigh = 0, dmedium = 0, dlow = 0;
//         analyzeddevDependencies.forEach(dep => {
//             if (dep.risklevel === "high") dhigh++;
//             if (dep.risklevel === "medium") dmedium++;
//             if (dep.risklevel === "low") dlow++;
//         })

//         return res.status(200).json({
//             success: true,
//             total: analyzedDependencies.length + analyzeddevDependencies.length,
//             prod_dependencies: analyzedDependencies,
//             highRisk: high,
//             mediumRisk: medium,
//             lowRisk: low,
//             dev_dependencies: analyzeddevDependencies,
//             dhighRisk: dhigh,
//             dmediumRisk: dmedium,
//             dlowRisk: dlow,

            
//         });
//     } catch (error) {
//         next(error);
    
//     }
// })

const analyzePackage = require("./src/services/dependencyService");

app.post("/analyze", upload.single("file"), (req, res, next) => {
    try {
        const filePath = req.file.path;
        const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        
        const result = analyzePackage(
            fileData.dependencies,
            fileData.devDependencies
        );

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
});



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    
});
app.use(errorHandler);
