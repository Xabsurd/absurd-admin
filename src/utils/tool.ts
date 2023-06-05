/**
 * 格式化日期(Y:年m:月d:日 H:时M:分S:秒)
 * @param {String} fmt 格式化样式，例如"YYYY:mm:dd HH:MM:SS"
 * @param {Date} date 被格式化的时间
 * @returns 格式化后的日期字符串
 */
 export function dateFormat(fmt:string, date:Date) {
  var ret;
  var opt:any = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
/**
 * 序列化对象
 * @param {Object}} data 对象
 * @returns 序列化后的对象
 */
export function ObjectFormat(data:any) {
  var d = "";
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      d += `${key}=${window.encodeURIComponent(element)}&`;
    }
  }
  return d.substring(0, d.length - 1);
}
/**
 * 递归删除对象数组中子节点{key}长度为0的属性和指定(key)的属性
 * @param {Array} data 数组对象
 * @param {String} children  子节点键名
 * @param {String} keys  键名数组
 * @returns {Array}
 */
export function clearNullChildenAndKey(data:Array<any>, children:string, keys = []) {
  return data.map((item) => {
    if (item[children]) {
      if (item[children].length > 0) {
        item[children] = clearNullChildenAndKey(item[children], children, keys);
      } else {
        delete item[children];
      }
    }
    for (let i = 0; i < keys.length; i++) {
      delete item[keys[i]];
    }
    return item;
  });
}
/**
 * 函数节流
 * @param {Function} fun 被节流的函数
 * @param {number} time 调用间隔
 * @returns 节流封装后的函数
 */
export function throttle(fun:Function, time:number) {
  let timer:NodeJS.Timeout|undefined = undefined;
  return function () {
    if (!timer) {
      fun(arguments);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = undefined;
      }, time);
    }
  };
}
/**
 * 函数防抖
 * @param {Function} fun 被防抖的函数
 * @param {number} time 调用间隔
 * @returns 防抖封装后的函数
 */
export function debounce(fun:Function, time:number) {
  let timer:NodeJS.Timeout|undefined = undefined;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    let args = arguments;
    timer = setTimeout(() => {
      fun(args);
    }, time);
  };
}
//递归获取dom相对于body的偏移量
export function getOffset(dom:HTMLElement) {
  let left = 0;
  let top = 0;
  while (dom) {
    left += dom.offsetLeft;
    top += dom.offsetTop;
    dom = dom.offsetParent as HTMLElement;
    if (dom.nodeName == "BODY") {
      break;
    }
  }
  return {
    left,
    top,
  };
}
/**
 * 
 * @param code 
 * @returns 
 */
export function getEvalVariable(code:string) {
  let res = `{${code?.match(/var(.*?)=/g)?.map(function (val) {
    let v = val.replace(/var|=/g, "");
    return v + ":" + v;
  })}}`;
  let result = eval(`(()=>{${code}return ${res}})()`);
  return result;
}

export function guid():string {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    // S4() +
    // "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    "-" +
    new Date().getTime().toString(16)
  );
}

/**
 * base64转blob
 * @param {string} urlData  base64字符串
 * @param {mime} type 图片类型
 * @returns
 */
export function base64ToBlob(urlData:string, type:string) {
  let arr = urlData.split(",");
  let mime = arr[0]?.match(/:(.*?);/)?.[1]|| type;
  // 去掉url的头，并转化为byte
  let bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab);

  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: type,
  });
}
// 校验是否含有特殊字符的正则表达式
export const regSpecialCharacters= new RegExp(/^[^`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{1,}$/);

// function test(num) {
//   let m=0;
//   for (let i = 30; i > 0; i--) {
//     m+=(num-(num/30*1))*0.00007;
//     console.log(m);
//   }
//   console.log(m);
// }
// test(1000)
