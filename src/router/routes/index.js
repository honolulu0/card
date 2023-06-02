import login from './login/index.js'
import menu from './menu/index.js'
import state from './state/index.js'
const routers =  new Set([...login, ...menu,...state]);
export default routers
