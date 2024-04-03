import menuMap, { type MenuMap } from '@/router/menuMap';
export async function getUserMenuMap(): Promise<MenuMap[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(menuMap);
    }, 0);
  });
}
