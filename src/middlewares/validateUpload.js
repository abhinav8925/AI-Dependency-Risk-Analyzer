const validateUpload = (req, res, next) => {
    if(!req.file){
        const error = new Error("File is required");
        error.statusCode = 400;
        return next(error);
    }

    if(req.file.mimetype !== "application/json"){
        const error = new Error("Only JSON files allowed");
        error.StatusCode = 400;
        return next(error);
    }
    next();
}
module.exports = validateUpload;