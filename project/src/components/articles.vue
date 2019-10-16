<template>
    <div class="c-articles scroll-vertical">
        <div class="catalog">目录</div>
        <div class="header">
            <div class="title">{{title}}</div>
            <div class="createTime">{{createTime}} 创建</div>
        </div>
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
    computed: {
        title () {
            return (this.$route.meta && this.$route.meta.title) || '';
        },
        createTime () {
            const time = this.$route.meta && this.$route.meta.createTime;
            return time ? this.$moment(time).format('YYYY.MM.DD HH:mm:ss') : '-';
        }
    },
    watch: {},
    methods: {},
    created () {},
    mounted () {}
};
</script>
<style lang="less">
.c-articles {
    margin-right: 180px;
    padding-right: 20px;
    border-right: @--border-base;
    .header {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: @--border-base;
        text-align: left;
        color: @--color-black;
        .title {
            font-size: 2.2em;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .createTime {
            color: @--color-text-secondary;
        }
    }
    .catalog {
        position: fixed;
        right: 166px;
        font-size: 18px;
        font-weight: 500;
        color: @--color-black;
    }
    .toc {
        position: fixed;
        right: 50px;
        top: 60px;
        width: 150px;
        font-size: @--font-size-base;
        padding-left: 16px;
        ul {
            padding-left: 16px;
            list-style-type: initial;
            line-height: 1.5;
        }
        a {
            color: @--color-text-primary;
        }
    }
}
</style>