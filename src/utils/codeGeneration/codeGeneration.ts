import GenerationVue from './generationVue';

export default class CodeGeneration {
  constructor() {}
  GenerationFormByJson(json: any, type: GenerationType) {
    switch (type) {
      case GenerationType.vue:
        return new GenerationVue().GenerationFormByJson(json, GenerationType.vue);
      case GenerationType.ts:
        return;
      default:
        break;
    }
  }
}
enum GenerationType {
  /**
   * 生成vue文件
   */
  vue,
  /**
   * 生成ts文件
   */
  ts
}
//mysql支持的所有数据类型
export enum SupportDataType {
  int = '整型',
  float = '浮点型',
  double = '双精度浮点型',
  char = '字符型',
  varchar = '字符串型',
  text = '文本型',
  date = '日期型',
  time = '时间型',
  datetime = '日期时间型',
  timestamp = '时间戳型',
  boolean = '布尔型',
  enum = '枚举型'
}
export { GenerationType };
