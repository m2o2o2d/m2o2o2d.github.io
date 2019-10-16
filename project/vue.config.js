const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const APP_PATH = resolve('src');
const alias = (dir) => path.join(APP_PATH, dir);

module.exports = {
    chainWebpack: config => {
        // alias
        config.resolve.alias
            .set('@', APP_PATH)
            .set('@assets', alias('assets'))
            .set('@articles', alias('articles'))
            .set('@components', alias('components'))
            .set('@packages', alias('packages'));
        // markdown
        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use('vue-loader')
                .loader('vue-loader')
                .tap(options => {
                    return {
                        ...options,
                        transformAssetUrls: {
                            source: 'src',
                            img: 'src'
                        }
                    };
                })
                .end()
            .use('./src/packages/markdown-loader')
                .loader(path.join(__dirname, './src/packages/markdown-loader'));
        // resource
        // config.module
        //     .rule('vue')
        //     .use('vue-loader')
    },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.join(__dirname, './src/styles/common/variable.less'),
            path.join(__dirname, './src/styles/common/base.less')
        ]
      }
    }
};
