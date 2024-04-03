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

export { GenerationType };
