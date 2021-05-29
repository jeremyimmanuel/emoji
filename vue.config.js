module.exports = {
    devServer: {
        proxy: "https://emoji-api.com",
    },
    configureWebpack: {
        devServer: {
            allowedHosts: ["0.0.0.0"],
        },
    },
};