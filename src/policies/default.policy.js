module.exports = {

    blockOn: {
        highVulnProd: true,
        forbiddenLicense: true
    },

    warnOn:{
        highvulnDev:true,
        mediumLicense: true,
        highRiskScore: true,
    },

    thresholds: {
        rikScore: 7,
    },

    allowedDevDependencies: true,
}