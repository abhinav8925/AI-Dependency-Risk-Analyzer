module.exports = {
    NO_CRITICAL_PROD_VULNS:{
        severity: "CRITICAL",
        appliesTo: "dependency",
        decision: "BLOCK"
    },

    NO_HIGH_PROD_VULNS:{
        severity: "HIGH",
        apliesTo:"dependency",
        decision: "BLOCK"
    },

    WARN_HIGH_DEV_VULNS:{
        severity: "HIGH",
        appliesTo: "devDependency",
        decision: "WARN"
    },

    WARN_CONTROL_DEV_VULNS:{
        severity: "CRITICAL",
        appliesTo: "devDependency",
        decision: "WARN"
    }
};