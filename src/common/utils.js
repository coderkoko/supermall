//防抖函数--------------------------------------------
export function debounce(func, delay = 1000) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

//节流函数--------------------------------------------
export function throttle(func, delay = 1000) {
  let previous = Date.now();
  return function () {
    let context = this; //this指向window
    let args = arguments;
    let now = Date.now();
    console.log(now - previous);
    if (now - previous >= delay) {
      func.apply(context, args);
      previous = Date.now();
    }
  }

}

//时间格式化函数--------------------------------------------
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
