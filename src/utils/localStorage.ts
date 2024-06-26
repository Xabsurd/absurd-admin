interface LocalStorageOption {
  name: string;
  value: string;
  expires?: string;
  startTime?: number;
}
//设置缓存
export function setItem(params: LocalStorageOption) {
  const obj: LocalStorageOption = {
    name: '',
    value: '',
    expires: '',
    startTime: new Date().getTime() //记录何时将值存入缓存，毫秒级
  };
  const options: LocalStorageOption = {
    name: '',
    value: ''
  };
  //将obj和传进来的params合并
  Object.assign(options, obj, params);
  if (options.expires) {
    //如果options.expires设置了的话
    //以options.name为key，options为值放进去
    localStorage.setItem(options.name, JSON.stringify(options));
  } else {
    //如果options.expires没有设置，就判断一下value的类型
    const type = Object.prototype.toString.call(options.value);
    //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
    if (type == '[object Object]') {
      options.value = JSON.stringify(options.value);
    }
    if (type == '[object Array]') {
      options.value = JSON.stringify(options.value);
    }
    localStorage.setItem(options.name, options.value);
  }
}
//拿到缓存
export function getItem(name: string) {
  let item: any = localStorage.getItem(name);
  if (!item) {
    return null;
  }
  //先将拿到的试着进行json转为对象的形式
  try {
    item = JSON.parse(item);
  } catch (error) {
    //如果不行就不是json的字符串，就直接返回
    return item;
  }
  //如果有startTime的值，说明设置了失效时间
  if (item.startTime) {
    const date = new Date().getTime();
    //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
    if (date - item.startTime > item.expires) {
      //缓存过期，清除缓存，返回false
      localStorage.removeItem(name);
      return false;
    } else {
      //缓存未过期，返回值
      return item.value;
    }
  } else {
    //如果没有设置失效时间，直接返回值
    return item;
  }
}
//移出缓存
export function removeItem(name: string) {
  localStorage.removeItem(name);
}
//移出全部缓存
export function clear() {
  localStorage.clear();
}
export default { setItem, getItem, removeItem, clear };

// storage.setItem({
//     name:"name",
//        value:"value"
// })
