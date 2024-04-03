//判断数据类型并返回DataType
export function getDataType(data: any) {
  return Object.prototype.toString
    .call(data)
    .replace(/\[object (.*)\]/, '$1')
    .toLowerCase() as DataType;
}
export enum DataType {
  //数字
  number = 'number',
  //字符串
  string = 'string',
  //布尔
  boolean = 'boolean',
  //对象
  object = 'object',
  //数组
  array = 'array',
  //函数
  function = 'function',
  //undefined
  undefined = 'undefined',
  //null
  null = 'null',
  //symbol
  symbol = 'symbol'
}
