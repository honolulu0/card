import axios from 'axios';
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
// import store from '@/src/store/index.js';
import {
	MessageBox
} from 'element-ui'
// 环境的切换
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'api/';
} else if (process.env.NODE_ENV == 'debug') {
	axios.defaults.baseURL = 'api/';
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'api/';
}


axios.defaults.timeout = 30000; //300秒 5分钟

axios.defaults.headers.post['Content-Type'] = 'application/json; text/event-stream;charset=UTF-8';
//application/json  python 用 json 接收
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// python 用 values 接收


// 请求拦截器
axios.interceptors.request.use(
	config => {
		// 每次发送请求之前判断vuex中是否存在token        
		// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
		// const token = store.state.token; 
		// token && (config.headers.Authorization = token);        
		return config;
	},
	error => {
		return Promise.error(error);
	})

// 响应拦截器
axios.interceptors.response.use(
	response => {
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
		// 否则的话抛出错误
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是2开头的的情况
	// 这里可以跟你们的后台开发人员协商好统一的错误状态码    
	// 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
	// 下面列举几个常见的操作，其他需求可自行扩展
	error => {
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作。                
				case 401:


					localStorage.removeItem('user');
					router.replace({
						path: '/login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					});
					break;
				case 402:
					// this.$message('您的vip权限已经到期,请续费!');

					MessageBox.alert('您的vip权限已经到期,请续费!', {
						confirmButtonText: '确定'
					}).then(() => {
						location.reload() // 跳转登录页
					});
					// store.commit('loginSuccess', null);
					// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 

					break;
					// 403 token过期
					// 登录过期对用户进行提示
					// 清除本地token和清空vuex中token对象
					// 跳转登录页面                
				case 403:
					// Toast({
					// 	message: '登录过期，请重新登录',
					// 	duration: 1000,
					// 	forbidClick: true
					// });
					// 清除token
					MessageBox.alert('登录过期，请重新登录', {
						confirmButtonText: '确定'
					}).then(() => {
						localStorage.clear() // 清除缓存
						location.replace('/login') // 跳转登录页
					});

					break;

					// 404请求不存在
				case 404:
					Toast({
						message: '网络请求不存在',
						duration: 1500,
						forbidClick: true
					});
					break;
					// 其他错误，直接抛出错误提示
				default:
					Toast({
						message: error.response.data.message,
						duration: 1500,
						forbidClick: true
					});
			}
			return Promise.reject(error.response);
		}
	})

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
/** 
 * put方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function put(url, params) {
	return new Promise((resolve, reject) => {
		axios.put(url, params)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
