function detectLicense(packageName){
    const mockLicense = {
        react: "MIT",
        express: "MIT",
        lodash: "MIT",

        "some-gpl-lib": "GPL-3.0",
        "unknown-lib": "UNKNOWN"
    };

    return mockLicense[packageName] || "UNKNOWN";
}

module.exports = {detectLicense};