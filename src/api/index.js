/**   
 * api接口统一管理
 */
import {
	get,
	post,
	put
} from '../axios/http.js';


export const card_search = (p) => get('/market/card_search', p);

export const all_attention = (p) => get('/all_attention', p);
export const del_attention = (p) => get('/del_attention_by_id', p);
export const add_attention = (p) => get('/add_attention', p);
export const modify_checked = (p) => get('/modify_checked', p);

export const job_login_out = (p) => get('/job/job_login_out', p);
export const get_jobs = (p) => get('/job/get_jobs', p);
export const del_job = (p) => post('/job/del_job', p);
export const add_job = (p) => post('/job/add_job', p);
export const job_login = (p) => post('/job/login', p);

export const search_history = (p) => get('/search_history', p);


export const formart_keys = (p) => get('/keys/get_keys', p);
export const all_keys = (p) => get('/keys/all_keys', p);
export const del_key = (p) => get('/keys/del_key', p);
export const add_keys = (p) => post('/keys/add_keys', p);
export const www_keys = (p) => get('/keys/www_keys', p);
export const set_status = (p) => get('/keys/set_status', p);
export const get_status = (p) => get('/keys/get_status', p);


// user
export const login = (p) => post('/user/login', p);
export const register = (p) => post('/user/register', p);

export const modify_user = (p) => post('/manage/modify', p);

export const search = (p) => get('/manage/search', p);
export const user_info = (p) => get('/user/info', p);
export const check_phone = (p) => get('/user/check_phone', p);

export const retrieve = (p) => get('/user/retrieve', p);
export const retrieve_phone = (p) => get('/user/retrieve_phone', p);

export const alipay = (p) => get('/pay/alipay', p);
