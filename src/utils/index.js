// DOM绑定事件
export function addEvent(element, event, handler, capture = false) {
  if (!element || !event || !handler) return;
  if (document.addEventListener) {
    element.addEventListener(event, handler, capture);
  } else {
    element.attachEvent('on' + event, handler);
  }
}
// DOM移除事件
export function removeEvent(element, event, handler, capture = false) {
  if (!element || !event) return;
  if (document.removeEventListener) {
    element.removeEventListener(event, handler, capture);
  } else {
    element.detachEvent('on' + event, handler);
  }
}
// DOM单次事件
export function onceEvent(element, event, handler) {
  const listener = function () {
    if (handler) {
      handler.apply(this, arguments);
    }
    removeEvent(element, event, listener);
  };
  addEvent(element, event, listener);
}
// 添加元素类名
export function addClass(element, clsName) {
  if (element.classList) {
    element.classList.add(clsName);
  } else if (!hasClass(element, clsName)) {
    element.className += ` ${clsName}`;
  }
}
// 判断元素类名
export function hasClass(element, clsName) {
  if (element.classList) {
    return element.classList.contains(clsName);
  } else {
    const regex = new RegExp(`(\\s|^)${clsName}(\\s|$)`);
    return !!element.className.match(regex);
  }
}
// 删除元素类名
export function removeClass(element, clsName) {
  if (element.classList) {
    element.classList.remove(clsName);
  } else if (hasClass(element, clsName)) {
    const regex = new RegExp(`(\\s|^)${clsName}(\\s|$)`);
    element.className = element.className.replace(regex, ' ');
  }
}
/**
 * 数组转树
 * @param {*} arr
 * @param {*} idKey 键名
 * @param {*} pidKey 父节点键名
 * @param {*} rootKey 根节点父节点值
 */
export function arrToTree(data, idKey = 'guid', pidKey = 'pid', rootKey) {
  const treeData = []; // 存放结果集
  const itemMap = {};
  for (const item of data) {
    const key = item[idKey];
    const pid = item[pidKey];

    if (!itemMap[key]) {
      itemMap[key] = {
        children: [],
      };
    }
    itemMap[key] = {
      ...item,
      children: itemMap[key]['children'],
    };
    const treeItem = itemMap[key];

    if (!pid || pid === rootKey) {
      treeData.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return treeData;
}
/**
 * 数组转对象 {key,value}
 * @param {*} arr
 * @param {*} key 对象键属性
 * @param {*} val 对象值属性
 * @returns
 */
export function arrToMap(arr, key = 'key', val = 'value') {
  return arr.reduce((acc, item) => ((acc[item[key]] = item[val]), acc), {});
}
/**
 * 对象转数组
 * @param {*} obj
 * @returns
 */
export function mapToArr(obj) {
  return Object.entries(obj).map(([key, val]) => ({
    key: +key,
    value: val,
  }));
}
/**
 * 映射转统计数据
 * @param {*} map
 * @param {*} obj
 * @returns
 */
export function mapToObj(map, obj = {}) {
  return Object.entries(map).reduce((acc, [key, val]) => ((acc[key] = { name: val, value: 0, ...obj }), acc), {});
}
/**
 * 解码base64字符串
 * @param {*} base64
 * @returns
 */
export function atobUTF16(base64) {
  const decodeStr = window.atob(base64);
  const typedArr = new Uint8Array(decodeStr.length);
  typedArr.forEach((_, idx, arr) => {
    arr[idx] = decodeStr.charCodeAt(idx);
  });
  return String.fromCharCode.apply(null, new Uint16Array(typedArr.buffer));
}
/**
 * 编码base64字符串
 * @param {*} str
 * @returns
 */
export function btoaUTF16(str) {
  const typedArr = new Uint16Array(str.length);
  typedArr.forEach((_, idx, arr) => {
    arr[idx] = str.charCodeAt(idx);
  });
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(typedArr.buffer)));
}
