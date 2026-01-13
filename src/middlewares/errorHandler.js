const AppError = require("../utils/apiError");

module.exports = (err, req, res, next) =>{

    console.log("ERROR: ", err);
    const status = err.statusCode || 500;
    const code  = err.code || "INTERNAL_ERROR";

    res.status(status).json({
        success: false,
        error:{
            message: err.message || "Something Went Wrong",
            code,
            status
        },
        meta:{
            "apiVerison": "v1",
            timestamp: new Date().toISOString()
        }
    });
    
};
