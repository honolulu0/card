const menuRoutes = [

	{
		path: '/card/',
		name: 'Card',
		meta: {
			title: "球星卡",
			icon: "icon-a-fenzu13"
		},
		component: resolve => require(['../../../views/home.vue'], resolve),
		children: [{
				path: 'on_sale',
				name: 'OnSale',
				meta: {
					title: "正在出售",
					keepAlive: true,
				},
				component: resolve => require(['../../../views/card/on_sale.vue'], resolve),
			},
			{
				path: 'my_attention',
				name: 'MyAttention',
				meta: {
					title: "我的关注",
					keepAlive: true,
				},
				component: resolve => require(['../../../views/card/my_attention.vue'], resolve),
			},
			{
				path: 'task',
				name: 'Task',
				meta: {
					title: "任务列表",
					keepAlive: true,
				},
				component: resolve => require(['../../../views/card/task.vue'], resolve),
			},
			{
				path: 'historical_price',
				name: 'HistoricalPrice',
				meta: {
					title: "历史查价",

					keepAlive: true,
				},
				component: resolve => require(['../../../views/card/historical_price.vue'], resolve),
			}

		]
	}, {
		path: '/admin/',
		name: 'admin',
		meta: {
			title: "后台管理",
		},
		component: resolve => require(['../../../views/home.vue'], resolve),
		children: [{
			path: 'my_keys',
			name: 'MyKeys',
			meta: {
				title: "自定义关键词",
				keepAlive: true,
			},
			component: resolve => require(['../../../views/card/my_keys.vue'], resolve),
		}, {
			path: 'manager',
			name: 'Manager',
			meta: {
				title: "用户管理",
				keepAlive: true,
			},
			component: resolve => require(['../../../views/admin/manager.vue'], resolve),
		}]
	}

]

export default menuRoutes
