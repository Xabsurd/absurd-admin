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
  vue = 'vue',
  /**
   * 生成ts文件
   */
  ts = 'ts'
}
//mysql支持的所有数据类型
export enum SupportDataType {
  integer = 'integer',
  float = 'float',
  double = 'double',
  char = 'char',
  varchar = 'varchar',
  text = 'text',
  date = 'date',
  time = 'time',
  datetime = 'datetime',
  timestamp = 'timestamp',
  boolean = 'boolean'
}
export { GenerationType };
