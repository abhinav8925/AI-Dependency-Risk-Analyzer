
const { Log } = require("ethers");

const express = require("express");
const app = express();
app.use(express.static("public"))
const PORT = process.env.PORT || 4000;
if(process.env.NODE_ENV!== "production"){
require("dotenv").config();
}
const http = require("http");
const multer = require('multer');
const fs = require("fs");
const { version } = require("os");
const AppError = require("./src/utils/apiError");
const {successResponse} = require("./src/utils/response");
const crypto = require("crypto");
const {saveAnalysis} = require("./src/store/analysis.store");
const {getAnalysis} = require("./src/store/analysis.store");
const {generateDecisionExplanationV2} = require("./src/explanations/decisionExplanation.v2")
const {saveExplanation} = require("./src/store/analysis.store")
const validateUpload = require("./src/middlewares/validateUpload")
const vulnerabilityDB = require("./src/data/vulnerabilityDB")
const {runAnalysis} = require("./src/core/analysis.pipeline")


if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}- ${file.originalname}`);
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) =>{
        if(file.mimetype !== "application/json"){
            return cb(
                new AppError(
                    "Only JSON files are allowed",
                    400,
                    "INVALID_FILE_TYPE"
                )
            );
        }
        cb(null, true);
    }
});




app.get("/", (req, res) => {
  res.json({
    message: "🛡️ AI Dependency Risk Analyzer API",
    status: "RUNNING",
    usage: {
      step1: "POST /analyze → Upload a package.json file (form-data key: file)",
      step2: "POST /explain/{analysisId} → Get security explanation"
    },
    importantNote: {
      liveAPI: "Public cloud deployment provides rule-based explanations (V1) for reliability.",
      aiMode: "Full AI explanations are available when running locally with Ollama.",
      reason: "Cloud environments cannot run local LLM models due to memory limitations."
    },
    localAIInstructions: [
      "1️⃣ Install Ollama",
      "2️⃣ Run: ollama run llama3",
      "3️⃣ Start backend locally: npm run dev",
      "4️⃣ Use ?mode=demo to force AI explanations"
    ],
    healthCheck: "/health"
  });
});

app.get("/health",(req,res)=>{
    res.json({
        ok:true,
        service:"dependency-risk-analyzer"
    })
})
// app.post("/health",(req,res)=>{
//     return res.status(200).json({
//          ok:true,
//          service: "dependency-risk-analyzer",
//          message:"Server is healthy.",
//          time: new Date().toISOString()
//         });
// });

app.post("/analyze", upload.single("file"), async(req, res, next) => {
    const startTime = Date.now();
    
    try {
        if (!req.file) {
            throw new AppError(
                "No file uploaded",
                400,
                "FILE_MISSING"
            );
        }
        
        const rawData = fs.readFileSync(req.file.path, "utf-8").trim();
        if(!rawData){
            return res.status(422).json({
                success:false,
                error: "No dependencies found in package.json"
            });
        }
        let fileData;
        try{
            fileData = JSON.parse(rawData)
        }catch(err){
            return res.status(400).json({
                success: false,
                error: "Invalid JSON format"
            });
        }
        // const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const hasDeps = fileData.dependencies && Object.keys(fileData.dependencies).length > 0;
        const hasDevDeps = fileData.devDependencies && Object.keys(fileData.devDependencies).length > 0;
        
        if(!hasDeps && !hasDevDeps){
            return res.status(422).json({
                success: false,
                error: "No dependencies found in package.json"
            });
        }
        
        // console.log("Calling runAnalysis...");
        const result = await runAnalysis(fileData)    
        const analysisId = crypto.randomUUID();
        saveAnalysis(analysisId,result)
        console.log("Fetching analysis ID:", analysisId);
        
        return res.status(200).json({
            success: true,
            analysisId,
            finalDecision: result.finalDecision,
            summary: result.summary,
            message: "Analysis completed. Use /explain/{analysisId} for AI explanation",
            data: result,          
            meta:{
            
                processingTimeMs:Date.now()-startTime
            }
        });
    } catch (error) {
        next(error)
    }
    console.log("req.file",req.file)
    console.log("req.body",req.body)
});

app.post("/explain/:analysisId",async(req,res)=>{
    const entry = getAnalysis(req.params.analysisId)
    if(!entry){
        return res.status(404).json({
            success:false,
            message:"Analysis not found or expired."
        });
    }

    const demoMode =  req.query.mode === "demo";

    const explanation = await generateDecisionExplanationV2(entry.data,{demo:demoMode});
    saveExplanation(req.params.analysisId, explanation);
    return res.json({
        success: true,
        explanation,
        aistatus: explanation.version === "v2" ? "AI" : "RULE_BASED",
        demoMode
        // cached:false
    });   
});

const errorHandler = require("./src/middlewares/errorHandler");
const { error } = require("console");
const { FINAL_DECISION } = require("./src/core/finalDecision.builder");
const { generateDecisionExplanationV1 } = require("./src/explanations/decisionExplanation.v1");
const { method } = require("lodash");
// const { message } = require("prompt");
const exp = require("constants");
// const { message } = require("prompt");
app.use(errorHandler);



app.listen(PORT, "0.0.0.0",()=>{
    
    console.log("Minimal Server running on", PORT);
    
})

