import Vue from 'vue';
import Antd from 'ant-design-vue';
import moment from 'moment';
import App from './app.vue';
import MarkdownItVue from '@components/markdown-it-vue.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router.config';

Vue.config.productionTip = false;

Vue.use(Antd);

Vue.component('MarkdownItVue', MarkdownItVue);

Object.defineProperties(Vue.prototype, {
	$moment: {
		get () {
			moment.locale('zh-cn');
            return moment;
		}
	}
});

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
