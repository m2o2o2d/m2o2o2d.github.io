<template>
    <div class="markdown-body" ref="markdown-it-vue-container"></div>
</template>
<script>
import MarkdownIt from 'markdown-it';
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItTOC from 'markdown-it-table-of-contents';
import MarkdownItSubscript from 'markdown-it-sub';
import MarkdownItSuperscript from 'markdown-it-sup';
import MarkdownItDeflist from 'markdown-it-deflist';
import MarkdownItAbbreviation from 'markdown-it-abbr';
import MarkdownItTasklists from 'markdown-it-task-lists';
import MarkdownItIcons from 'markdown-it-icons';
import MarkdownItHighlight from 'markdown-it-highlight';
import MarkdownItContainer from 'markdown-it-container';
import MarkdownItGithubToc from 'markdown-it-github-toc';
import MarkdownItEcharts from '@packages/markdown-loader/markdown-it-plugin-echarts';
import MarkdownItMermaid from '@packages/markdown-loader/markdown-it-plugin-mermaid';
import MarkdownItFlowchart from '@packages/markdown-loader/markdown-it-plugin-flowchart';
import 'github-markdown-css';
import 'markdown-it-icons/dist/index.css';
import 'markdown-it-highlight/dist/index.css';
import echarts from 'echarts';
import mermaid from 'mermaid';
import flowchart from 'flowchart.js';
const DEFAULT_OPTIONS_ICONS = 'font-awesome';
const DEFAULT_OPTIONS_GITHUBTOC = {
    tocFirstLevel: 1,
    tocLastLevel: 3,
    tocClassName: 'toc',
    anchorLinkSymbol: '',
    anchorLinkSpace: false,
    anchorClassName: 'anchor',
    anchorLinkSymbolClassName: 'octicon octicon-link'
};
export default {
    name: 'MarkdownItVue',
    desc: '解析markdown文件',
    components: {},
    props: {
        content: {
            type: String
        },
        options: {
            type: Object,
            default () {
                return {
                    markdownIt: {
                        linkify: true
                    },
                    tasklists: null,
                    icons: DEFAULT_OPTIONS_ICONS
                };
            }
        }
    },
    data () {
        const optMarkdownIt = this.options.markdownIt;
        const optTasklists = this.options.tasklists;
        const optIcons = this.options.icons || DEFAULT_OPTIONS_ICONS;
        const optGithubToc = this.options.githubToc || DEFAULT_OPTIONS_GITHUBTOC;
        const createContainer = (klass, defaultTitle) => {
            return [MarkdownItContainer, klass, {
                render (tokens, idx) {
                    const token = tokens[idx];
                    const info = token.info.trim().slice(klass.length).trim();
                    if (token.nesting === 1) {
                        return `<div class="${klass} custom-block"><p class="custom-block-title">${info || defaultTitle}</p>\n`;
                    } else {
                        return `</div>\n`;
                    }
                }
            }];
        };
        let md = new MarkdownIt(optMarkdownIt)
            .use(MarkdownItEmoji)
            .use(MarkdownItTOC, { includeLevel: [1, 2, 3] })
            .use(MarkdownItSubscript)
            .use(MarkdownItSuperscript)
            .use(MarkdownItDeflist)
            .use(MarkdownItAbbreviation)
            .use(MarkdownItHighlight)
            .use(MarkdownItMermaid)
            .use(MarkdownItEcharts)
            .use(MarkdownItFlowchart)
            .use(MarkdownItTasklists, optTasklists)
            .use(MarkdownItIcons, optIcons)
            .use(MarkdownItGithubToc, optGithubToc)
            .use(...createContainer('tip', 'TIP'))
            .use(...createContainer('warning', 'WARNING'))
            .use(...createContainer('danger', 'DANGER'));
        return {
            md: md
        };
    },
    computed: {},
    watch: {
        content: {
            immediate: true,
            handler (next) {
                this.$nextTick(() => {
                    this.$refs['markdown-it-vue-container'].innerHTML = this.md.render(next);
                    // render echarts
                    document.querySelectorAll('.md-echarts').forEach(element => {
                        try {
                            let options = JSON.parse(element.textContent);
                            let chart = echarts.init(element);
                            chart.setOption(options);
                        } catch (e) {
                            element.outerHTML = `<pre>echarts complains: ${e}</pre>`;
                        }
                    });
                    // render mermaid
                    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
                    // render flowchart
                    document.querySelectorAll('.md-flowchart').forEach(element => {
                        try {
                            let code = element.textContent;
                            let chart = flowchart.parse(code);
                            element.textContent = '';
                            chart.drawSVG(element);
                        } catch (e) {
                            element.outerHTML = `<pre>flowchart complains: ${e}</pre>`;
                        }
                    });
                    // render image
                    document.querySelectorAll('img').forEach(element => {
                        try {
                            let src = element.src;
                            src = src.split('@assets/')[1];
                            if (src) {
                                const image = require(`@assets/${src}`);
                                element.src = image;
                            }
                        } catch (e) {
                            element.outerHTML = `<pre>image complains: ${e}</pre>`;
                        }
                    });
                });
            }
        }
    },
    methods: {
        use (plugin, options) {
            this.md.use(plugin, options);
        }
    },
    created () {},
    mounted () {}
};
</script>
<style lang="less">
.markdown-body {
    text-align: left;
    color: @--color-text-primary;
    font-size: 16px;
}
/* Markdown: Header
--------------------------- */
.markdown-body h1 {
    margin: 40px 0 20px 0;
    border-bottom: @--border-base;
}
.markdown-body h2 {
    margin: 30px 0 20px 0;
    border-bottom: @--border-base;
}
/* Markdown: Image
--------------------------- */
.markdown-body img {
}
/* Markdown: Tips
--------------------------- */
.custom-block.tip, .custom-block.success, .custom-block.warning, .custom-block.danger {
    padding: .1rem 1.5rem;
    border-left-width: .5rem;
    border-left-style: solid;
    margin: 1rem 0;
}
.custom-block .custom-block-title {
    font-weight: 600;
    margin-bottom: -.4rem;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.custom-block.tip {
    background-color: #d9ecff;
    border-color: #409EFF;
}
.custom-block.success {
    background-color: #e1f3d8;
    border-color: #67c23b;
}
.custom-block.warning {
    background-color: #faecd8;
    border-color: #E6A23C;
}
.custom-block.danger {
    background-color: #fde2e2;
    border-color: #F56C6C;
}
/* Markdown: Mermaid
--------------------------- */
.mermaid {
    margin-bottom: 16px;
}
.mermaid .messageText {
    font-size: 12px;
}
</style>