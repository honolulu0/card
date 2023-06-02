function getClientInfo() {
  // 获取用户屏幕高度：减去的230是页面中layout之类固定的高度
  let h = 280
  return parseInt(window.innerHeight - h) || parseInt(document.documentElement.clientHeight - h) || parseInt(document.body.clientHEight - h);
}
/**
 * @returns {num: 表格动态高度}
 */
export function getDynamicHeight(ref) {
  // 获取到的实时屏幕高度 - 页面中固定的元素高度
  let height = parseInt(getClientInfo()) - parseInt(window.getComputedStyle(ref).height);
  return {
    height
  };
}

// 防抖
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
