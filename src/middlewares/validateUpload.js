const AppError = require("../utils/apiError");
const validateUpload = (req, res, next) => {
    if(!req.file){
        return next(
            new AppError(
                "package.json file is required",
                400,
                "FILE_MISSING"
            )
        );
    }
    if(req.file.mimetype !== "application/json"){
        return next(
            new AppError(
                "Only JSON are allowed",
                400,
                "INVALID_FILE_TYPE"
            )
        );
    }
    next();
}
module.exports = validateUpload;