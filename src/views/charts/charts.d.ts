export interface ChartThemeType {
  textStyle: {
    color: string;
  };
  splitLine: {
    lineStyle: {
      color: string;
    };
  };
  axisLine: {
    lineStyle: {
      color: string;
    };
  };
  minorSplitLine: {
    lineStyle: {
      color: string;
    };
  };
  tooltip: {
    show: boolean;
    trigger: string;
    axisPointer: {
      type: string;
      label: {
        color: string;
        backgroundColor: string;
      };
    };
    backgroundColor?: string;
    borderWidth?: number;
    textStyle?: {
      color: string;
    };
  };
}
