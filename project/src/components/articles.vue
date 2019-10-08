<template>
    <div class="c-articles scroll-vertical">
        <div class="catalog">目录</div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'Articles',
    desc: '',
    components: {},
    props: {},
    data () {
        return {
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created () {},
    mounted () {}
};
</script>
<style lang="less" scoped>
.c-articles {
    .catalog {
        position: fixed;
        right: 166px;
        font-size: 18px;
        font-weight: 500;
        color: @--color-black;
    }
    .content {
        margin-right: 180px;
        border-right: @--border-base;
        text-align: left;
        padding-right: 20px;
    }
    /deep/.table-of-contents {
        position: fixed;
        right: 50px;
        top: 60px;
        width: 150px;
        font-size: @--font-size-small;
        ul {
            padding-left: 16px;
            list-style-type: initial;
            line-height: 2;
        }
        a {
            color: @--color-text-primary;
        }
    }
}
</style>