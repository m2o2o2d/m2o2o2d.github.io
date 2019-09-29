const path = require('path');

module.exports = {
    chainWebpack: config => {
        // markdown
        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use('vue-loader')
                .loader('vue-loader')
                .end()
            .use('./src/packages/markdown-loader')
                .loader(path.join(__dirname, './src/packages/markdown-loader'));
    }
};