import { nextTick } from 'vue';
import { MainStore } from '../../../store/index';
//全局状态
const mainState = MainStore();

//参数
const notModeType: any = { slide: true };
//函数|逻辑代码
export function getTransitionType(type: string) {
  if (type) {
    if (notModeType[type]) {
      return 'default';
    } else {
      return 'out-in';
    }
  } else {
    return 'default';
  }
}
export function hideMenu() {
  mainState.menuCollapse = true;
}
export function windowResize() {
  if (window.innerWidth <= 992) {
    if (!mainState.menuCollapse) {
      mainState.menuCollapse = true;
    }
  } else {
    if (mainState.menuCollapse) {
      mainState.menuCollapse = false;
    }
  }
  if (
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    false
  ) {
    console.log(1);
  } else {
    if (mainState.fullScreen !== 1) {
      mainState.fullScreen = 0;
    }
  }
}
export function windowKeyDown(e: KeyboardEvent) {
  switch (e.keyCode) {
    case 27:
      mainState.fullScreen = 0;
      break;
    default:
      break;
  }
}
