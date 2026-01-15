const { message } = require("prompt");

module.exports = {
    HIGH_VULNERABILITY_PRESENT: {
        severity: "HIGH",
        message: "High Severity vulnerability detected."
    },
    REMOTE_EXPLOIT_PRESENT: {
        severity: "CRITICAL",
        message: "Remote exploitable vulnerability detected."
    },
    MULTIPLE_MEDIUM_VULNS: {
        severity: "MODERATE",
        message: "Multiple medium severity vulnerability detected."
    }
}