<template>
	<div id="app">
		<a-layout class="app-layout">
			<a-layout-sider :trigger="null" collapside v-model="groupCollapsed">
				<a-menu @click="handleArticlesClick" :defaultSelectedKeys="defaultSelectedKeys" :openKeys.sync="openKeys" mode="inline" class="app-menu scroll-vertical" theme="dark">
					<a-sub-menu key="frontend">
						<span slot="title"><a-icon type="select"/><span>前端</span></span>
						<a-menu-item key="javascript">JavaScript</a-menu-item>
					</a-sub-menu>
				</a-menu>
				<div class="footer-btn" @click="() => groupCollapsed = !groupCollapsed">
					<a-icon :type="groupCollapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
				</div>
			</a-layout-sider>

			<a-layout>
				<a-layout-sider :trigger="null" collapside v-model="articleCollapsed" class="sub-sider">
					<a-menu @click="handleItemClick" :defaultSelectedKeys="defaultSelectedArticles" mode="inline" class="app-menu scroll-vertical">
						<a-menu-item v-for="(item) in articlesRoutes" :key="item.id">
							{{item.title}}
						</a-menu-item>
					</a-menu>
					<div class="footer-btn" @click="() => articleCollapsed = !articleCollapsed">
						<a-icon :type="articleCollapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
					</div>
				</a-layout-sider>
				<a-layout-content class="app-content">
					<router-view></router-view>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</div>
</template>
<script>
import routeConfig from './router.config.json';
export default {
	name: 'App',
	desc: '',
	components: {},
	props: {},
	data () {
		return {
			groupCollapsed: false,
			defaultSelectedKeys: ['javascript'],
			openKeys: ['frontend'],
			articleCollapsed: false,
			articlesRoutes: []
		};
	},
	computed: {
		defaultSelectedArticles () {
			if (this.articlesRoutes[0]) {
				return [this.articlesRoutes[0].id];
			}
			return [];
		}
	},
	watch: {},
	methods: {
		handleArticlesClick ({ item, key, keyPath }) {
			this.getArticlesRoutes(keyPath);
		},
		getArticlesRoutes (keyPath) {
			if (keyPath) {
				const articlesCfg = routeConfig.articles;
				let config = articlesCfg;
				for (let l = keyPath.length, i = l - 1; i > 0; i--) {
					config = config.find(item => item.name === keyPath[i]).groups;
				}
				config = config.find(item => item.name === keyPath[0]);
				this.articlesRoutes = this.getLeafRoutes(config);
			}
		},
		getLeafRoutes (config) {
			let articles = [];
			if (config && config.groups) {
				config.groups.forEach(group => {
					articles = articles.concat(this.getLeafRoutes(group));
				});
			} else if (config && config.children) {
				articles = articles.concat(config.children);
			} else if (config) {
				articles.push(articles);
			}
			return articles;
		},
		handleItemClick ({ item, key, keyPath }) {
			console.log(item);
			console.log(key);
			console.log(keyPath);
			const route = this.articlesRoutes.find(item => item.id === key);
			this.$router.push({name: route.id});
		}
	},
	created () {
		this.getArticlesRoutes(['javascript', 'frontend']);
	},
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
	.footer-btn {
		height: 30px;
		font-size: 18px;
		cursor: pointer;
	}
	.app-menu {
		height: calc(~"100% - 30px");
		text-align: left;
	}
	.app-content {
		background-color: #fff;
		padding: 24px;
	}
	.sub-sider {
		background: @--color-white;
	}
}
</style>
