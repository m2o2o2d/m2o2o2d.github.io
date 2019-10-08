import Vue from 'vue';
import VueRouter from 'vue-router';
import routeConfig from './router.config.json';

const loadComponents = (name) => {
	return r => require.ensure([], () => r(require(`./components/${name}.vue`)));
};

const load = (path) => {
	console.log(path);
	return r => require.ensure([], () => r(require(`./${path}.md`)));
};

// groups: folder, children: articles
const registerRoute = (routeConfig) => {
	const addRoute = (nav, filePath, index) => {
		if (nav.groups && nav.groups.length) {
			nav.groups.forEach(group => {
				addRoute(group, `${filePath}/${group.name}`, index);
			});
		} else if (nav.children && nav.children.length) {
			nav.children.forEach(child => {
				addRoute(child, `${filePath}/${child.name}`, index);
			});
		} else {
			const article = load(`${filePath}`);
			const route = {
				path: nav.id,
				name: nav.id,
				component: article,
				meta: {
					title: nav.title,
					createTime: nav.createTime
				}
			};
			routes[index].children.push(route);
		}
	};
	let routes = [];
	Object.keys(routeConfig).forEach((kind, index) => {
		let navs = routeConfig[kind];
		routes.push({
			path: `/${kind}`,
			redirect: `/${kind}/1`, // TODO
			component: loadComponents(`${kind}`),
			children: []
		});
		navs.forEach(nav => {
			addRoute(nav, `${kind}/${nav.name}`, index);
		});
	});
	return routes;
};

let routes = registerRoute(routeConfig);

// 设置默认路由
let defaultPath = '/articles/1';
routes = routes.concat([{
    path: '/',
    redirect: defaultPath
}, {
    path: '*',
    redirect: defaultPath
}]);

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});
