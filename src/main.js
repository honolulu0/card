import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/theme/index.css';
import './assets/iconfont/iconfont.css'
import * as api from './api/index.js' // 导入api接口

Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码
Vue.use(ElementUI);
Vue.prototype.$user = {
	info: {},
	grade: ["普通会员", "黄金会员", "钻石会员"],
	fun:null
}
Vue.config.productionTip = false

/******************路由卫士******************/
router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	// console.log(from.path, to.path);
	let user = JSON.parse(localStorage.getItem("user"));
	if (user) {
		if (to.path == '/login') {

			if (from.path !== '/') {
				localStorage.removeItem("user")
			} else {
				next({
					name: 'OnSale'
				})
			}

		} else if (user.grade == 1 && ["/card/task", "/card/my_attention"].indexOf(to.path) > -1) {
			ElementUI.MessageBox.alert('此功能仅向VIP用户开放,请先购买VIP!', {
				confirmButtonText: '去开通VIP'
			}).then(() => {
				// location.reload() // 跳转登录页
				Vue.prototype.$user.fun()
			});
			// console.log('请先购买VIP购买')
			next(false);
		} else {
			next();
		}



	} else if (to.path != '/login' && to.path != '/register' && to.path != '/retrieve') {
		next({
			path: '/login'
		})
	} else {
		next();
	}
	// console.log("------", from.path, to.path);


})
router.afterEach((to, from) => {

})
/******************路由卫士******************/

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
