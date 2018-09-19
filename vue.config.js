module.exports = {
    baseUrl: '/public/',
    devServer: {
        port: 2345
    },
    configureWebpack: {
       
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: ['./public/index.html']
                }
            ]
        }
    }
};
