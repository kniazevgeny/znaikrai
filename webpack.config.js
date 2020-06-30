module.exports = {
    configureWebpack: (config) => {
        config.module.rules = [
            {
                test: /\.worker\.js$/,
                use: [
                    {
                        loader: 'worker-loader',
                    }
                ]
            },
            ...config.module.rules
        ]
    }
}
