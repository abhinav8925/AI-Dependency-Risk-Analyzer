module.exports={
    MIT:{
        risk: "LOW",
        type:"PERMISSIVE",
        description: "Permissive license allowing commercial use."
    },

    Apache_2_0: {
        risk: "LOW",
        type:"PERMISSIVE",
        description: "Permissive license with patent grant."
    },

    BSD:{
        risk: "LOW",
        type:"PERMISSIVE",
        description: "Permissive open-source license."
    },

    LGPL: {
        risk: "MEDIUM",
        type:"WEAK_COPYLEFT",
        description: "Allows linking but restricts modifications."
    },

    GPL:{
        risk: "HIGH",
        type:"STRONG_COPYLEFT",
        description: "Requires open-sourcing derivative works."
    },

    AGPL: {
        risk: "CRITICAL",
        type:"NETWORK_COPYLEFT",
        description: "Requires source disclosure even for SaaS."
    },

    UNKNOWN:{
        risk: "MEDIUM",
        type:"UNKNOWN",
        description: "License could not be determined."
    }

}