function successResponse(res, message, data, statusCode = 200, startTime){

    const processingTimeMS = startTime
    ? Date.now() - startTime
    : undefined;

    return res.status(statusCode).json({
        success: true,
        message,
        data,
        meta:{
            apiVersion: "v1",
            timestamp: new Date().toISOString(),
            ...(processingTimeMS && {processingTimeMS})
        }
    });
}

function errorResponse(Res, message, code = "SERVER_ERROR", statusCode = 500){

    const processingTimeMS = startTime
    ? Date.now() - startTime
    : undefined;
    
    return res.statusCode(statusCode).json({
        success: false,
        message,
        error:{
            code,
        },
        meta:{
            apiVersion: "v1",
            timestamp: new Date().toISOString(),
            ...(processingTimeMS && {processingTimeMS})
        }
    });
}

module.exports = {
    successResponse,
    errorResponse
}