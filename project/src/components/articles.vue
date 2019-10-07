<template>
    <div class="c-articles">
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
    .content {
        margin-right: 300px;
        text-align: left;
        /deep/h2 {
            color: @--color-white;
        }
    }
}
</style>