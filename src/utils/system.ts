/**
 * 获取系统主题
 * @returns {string} 主题
 */
export function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
