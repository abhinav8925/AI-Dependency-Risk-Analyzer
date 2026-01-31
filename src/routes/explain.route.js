const express = require("express");
const router = express.Router();

const {generateDecisionExplanationV2} = require("../explanations/decisionExplanation.v2");
const { message } = require("prompt");
router.post("/",async(req,res)=>{
    try{
        const analysisResult = req.body;

        if(!analysisResult || !analysisResult.finalDecision){
            return res.status(400).json({
                success:false,
                message:"Invalid analysis result"
            });
        }
        const explanation = await generateDecisionExplanationV2(analysisResult);
        res.json({
            success:true,
            explanation
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
});

module.exports = router