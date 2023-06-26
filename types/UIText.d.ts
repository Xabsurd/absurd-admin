interface Sider {
  text: string;
  children?: Record<string, Sider>;
}

interface Setting {
  language: string;
  theme: string;
  themeOption: record<string, string>;
}

interface Image2Tiles {
  rowNum: string;
  colNum: string;
  fileList: string;
  start: string;
  tip: string;
  processing: string;
}

interface FunctionLine {
  functionText: string;
  functionName: string;
  defaultFunctionName: string;
  max: string;
  min: string;
  interval: string;
  smooth: string;
  run: string;
  add: string;
}

interface HomeLoans {
  money: string;
  interestRate: string;
  interestRateTip: string;
  loanTerm: string;
  inflation: string;
  type: string;
  typeY: string;
  typeM: string;
}

interface Line {
  functionLine: FunctionLine;
  HomeLoans: HomeLoans;
}

interface Chart {
  line: Line;
}

interface PasswordGenerator {
  title: string;
  Uppercase: string;
  Lowercase: string;
  Number: string;
  Special: string;
}

interface Tools {
  passwordGenerator?: PasswordGenerator;
}

interface UIText {
  sider: Record<string, Sider>;
  setting: Setting;
  canvas: {
    Image2Tiles?: Image2Tiles;
  };
  chart: Chart;
  tools: Tools;
}
