<template>
	<div id="app">
		<!-- <div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
		</div>
		<router-view/> -->
		<a-layout class="app-layout">
			<a-layout-sider :trigger="null" collapside v-model="collapsed">
				<a-menu @click="handleClick" :defaultSelectedKeys="['1']" :openKeys.sync="openKeys" mode="inline" class="app-menu">
					<a-sub-menu key="sub1" @titleClick="titleClick">
						<span slot="title"><a-icon type="mail" /><span>前端</span></span>
						<a-menu-item key="1">JS</a-menu-item>
						<a-menu-item key="2">CSS</a-menu-item>
					</a-sub-menu>
					<a-sub-menu key="sub2" @titleClick="titleClick">
						<span slot="title"><a-icon type="mail" /><span>Git</span></span>
						<a-menu-item key="3">JS</a-menu-item>
						<a-menu-item key="4">CSS</a-menu-item>
						<a-menu-item key="5">JS</a-menu-item>
						<a-menu-item key="6">CSS</a-menu-item>
						<a-menu-item key="7">JS</a-menu-item>
						<a-menu-item key="8">CSS</a-menu-item>
						<a-menu-item key="9">JS</a-menu-item>
						<a-menu-item key="10">CSS</a-menu-item>
						<a-menu-item key="11">JS</a-menu-item>
						<a-menu-item key="12">CSS</a-menu-item>
						<a-menu-item key="13">JS</a-menu-item>
						<a-menu-item key="14">CSS</a-menu-item>
						<a-menu-item key="15">JS</a-menu-item>
						<a-menu-item key="16">CSS</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</a-layout-sider>
			<a-layout>
				<a-layout-sider :trigger="null" collapside v-model="collapsed">
					<a-menu @click="handleClick" :defaultSelectedKeys="['1']" :openKeys.sync="openKeys" mode="inline" class="app-menu">
						<a-sub-menu key="sub1" @titleClick="titleClick">
							<span slot="title"><a-icon type="mail" /><span>前端</span></span>
							<a-menu-item key="1">JS</a-menu-item>
							<a-menu-item key="2">CSS</a-menu-item>
						</a-sub-menu>
						<a-sub-menu key="sub2" @titleClick="titleClick">
							<span slot="title"><a-icon type="mail" /><span>Git</span></span>
							<a-menu-item key="3">JS</a-menu-item>
							<a-menu-item key="4">CSS</a-menu-item>
						</a-sub-menu>
					</a-menu>
				</a-layout-sider>
				<a-layout-content class="app-content">
					<router-view></router-view>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</div>
</template>
<script>
export default {
	name: 'App',
	desc: '',
	components: {},
	props: {},
	data () {
		return {
			collapsed: false,
			openKeys: ['sub1']
		};
	},
	computed: {},
	watch: {},
	methods: {
		handleClick () {
			
		},
		titleClick () {

		}
	},
	created () {},
	mounted () {}
};
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.app-layout {
	height: 100%;
	.app-menu {
		height: 100%;
		text-align: left;
	}
	.app-content {
		background-color: #fff;
		padding: 24px;
	}
}
</style>
