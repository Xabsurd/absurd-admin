/**
 * 判断数据是否唯一且不为空
 * @param dataArray 源数据
 * @param key key
 * @returns
 */
export function isUniqueKeyAndNotNull(dataArray: any[], key: string): UniqueValidateResult {
  const keySet = new Set<string>();
  for (const item of dataArray) {
    if (!item[key]) {
      return UniqueValidateResult.Null; // 发现为空的key值
    }
    if (keySet.has(item[key])) {
      return UniqueValidateResult.Duplicate; // 发现重复的key值
    }
    keySet.add(item[key]);
  }
  return UniqueValidateResult.Unique; // 所有key值都是唯一的
}
export enum UniqueValidateResult {
  Unique = 1,
  Duplicate = 2,
  Null = 3
}
