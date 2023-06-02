const loginRoutes = [{
		path: '*',
		redirect: '/' //重定向
	},{
		path: '/',
		redirect: '/login' //重定向
	}, {
		path: '/login',
		name: 'login',
		component: resolve => require(['../../../views/index.vue'], resolve),
	}, {
		path: '/register',
		name: 'register',
		component: resolve => require(['../../../views/register.vue'], resolve),
	}, {
		path: '/retrieve',
		name: 'retrieve',
		component: resolve => require(['../../../views/retrieve.vue'], resolve),
	},

]

export default loginRoutes
