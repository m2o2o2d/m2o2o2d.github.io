'use strict';
// import MermaidPlugin from './markdown-it-plugin-mermaid';

const hash = require('hash-sum');
const LRU = require('lru-cache');
const hljs = require('highlight.js');

// markdown-it 插件
// const emoji = require('markdown-it-emoji');
// const anchor = require('markdown-it-anchor');
// const toc = require('markdown-it-table-of-contents');

// 自定义块
// const containers = require('./containers');
// const mermaid = require('./markdown-it-plugin-mermaid');

const md = require('markdown-it')({
    html: true,
    // 代码高亮
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="language-${lang}>"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
            } catch {}
        }
        return `<pre v-pre class="language-bash"<code>${md.utils.escapeHtml(str)}</code></pre>`;
    }
});
// 使用emoji插件渲染emoji
// .use(emoji)
// 使用anchor插件为标题元素添加锚点
// .use(anchor, {
//     permalik: true,
//     permalinkBefore: true,
//     permalinkSymbol: '#'
// })
// 使用table-of-contents插件实现自动生成目录
// .use(toc, {
//     includeLevel: [1, 2, 3]
// })
// 使用mermaid实现画图
// .use(MermaidPlugin)
// .use(mermaid)
// 定义自定义的块容器
// .use(containers);

const cache = LRU({max: 1000});

module.exports = src => {
    const isProd = process.env.NODE_ENV === 'production';
    const file = this.resourcePath;
    const key = hash(file + src);
    const cached = cache.get(key);

    // 重新模式下构建时使用缓存以提高性能
    if (cached && (isProd || /\?vue/.test(this.resourceQuery))) {
        return cached;
    }

    // const html = md.render(src);
    // const res = (
    //     `<template>\n` +
    //         `<div class="content">${html}</div>\n` +
    //     `</template>\n`
    // );

    const res = (
        `<template>\n` +
            `<MarkdownItVue content="${src}"/>\n` +
        `</template>\n`
    );
    cache.set(key, res);
    return res;
};