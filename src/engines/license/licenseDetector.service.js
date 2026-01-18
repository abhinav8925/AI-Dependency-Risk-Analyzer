const MOCK_LICENSE_MAP = {
    react: "MIT",
    express: "MIT",
    lodash: "MIT",

    "some-gpl-lib": "GPL-3.0",
    "unknown-lib": "UNKNOWN"

}

function detectLicense(packageName){
    
    if(!packageName)    return "UNKNOWN";

    const name = String(packageName).toLowerCase();
    const license = MOCK_LICENSE_MAP[name] || "UNKNOWN";

    return String(license).toUpperCase();

}

module.exports = {detectLicense};