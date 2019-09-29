module.exports = {
    root: true,
    // parser: "vue-eslint-parser",
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    "extends": ["standard", "plugin:vue/recommended"],
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
        "semi": [2,"always"],
        "indent": [2,4],
        "no-new": [0],
        "no-debugger": [0],
        "camelcase": [0,{
            "properties": "never"
        }],
        "object-curly-spacing": ['off'],
        "object-property-newline": ['off'],
        "object-curly-newline": ['off'],
        "indent": ['off'],
        // enforce consistent linebreak style
        "linebreak-style": ['off'],
        // require or disallow newline at the end of files
        "eol-last": ['off'],
        // disallow trailing whitespace at the end of lines
        "no-trailing-spaces": ['off'],
        // disallow multiple empty lines
        "no-multiple-empty-lines": ['off'],
        // disallow all tabs.  Some style guides don’t allow the use of tab characters at all, including within comments.
        "no-tabs": ['off'],
        // =================================  eslint-plugin-vue rules ==============================
        // "vue/return-in-computed-property": ["warn"],
        "vue/this-in-template": ["warn"],
        "vue/no-unused-components": ["off"],
        "vue/require-default-prop": ["off"],
        "vue/require-prop-types": ["off"],
        "vue/require-prop-type-constructor": ["off"],
        "vue/require-valid-default-prop": ["off"],
        "vue/no-side-effects-in-computed-properties": ["off"],
        "vue/no-parsing-error": ["off"],
        "vue/no-use-v-if-with-v-for": ["off"],
        "vue/no-template-shadow": ["off"],
        // disallow use of v-html to prevent XSS attack
        "vue/no-v-html": ["off"],
        // disallow unused variable definitions of v-for directives or scope attributes
        "vue/no-unused-vars": ["off"],
        // require v-bind:key with v-for directives
        "vue/require-v-for-key": ["off"],
        // enforce order of properties in components
        "vue/order-in-components": ["off"],
        // disallow multiple spaces in tags
        "vue/no-multi-spaces": ["off"],
        // template的空格数
        "vue/html-indent":  ["off", 4, {
            alignAttributesVertically: true
        }],
        // 插值符号中的空格：always： 1  never： 0
        "vue/mustache-interpolation-spacing":  ["off", "never"],
        // template中的引号样式
        "vue/html-quotes":  ["off"],
        // 属性是否是连字符写法
        "vue/attribute-hyphenation": ["off"],
        // 自闭合元素 the self-closing sign as the configured style.
        "vue/html-self-closing":  ["off"],
        // 不允许attributes中等号两边出现空格
        "vue/no-spaces-around-equal-signs-in-attribute":  ["off"],
        // enforce specific casing for the component naming style in template
        "vue/component-name-in-template-casing":  ["off"],
        // enforce specific casing for the name property in Vue components
        "vue/name-property-casing":  ["off"],
        // enforce specific casing for the Prop name
        "vue/prop-name-casing": ["off"],
        "vue/html-closing-bracket-newline":  ["off"],
        // require or disallow a space before tag's closing brackets
        "vue/html-closing-bracket-spacing":  ["off"],
        // This rule enforces v-bind directive style which you should use shorthand or long form.
        "vue/v-bind-style":  ["off"],
        // enforce the maximum number of attributes per line
        "vue/max-attributes-per-line": ["off"],
        // require a line break before and after the contents of a singleline element
        "vue/singleline-html-element-content-newline":  ["off"],
        // require a line break before and after the contents of a multiline element
        "vue/multiline-html-element-content-newline":  ["off"],
        // component的attributes顺序 https://vuejs.org/v2/style-guide/#Element-attribute-order-recommended
        "vue/attributes-order":  ["off"]
    }
}