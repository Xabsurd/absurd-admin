export default {
  sider: {
    home: { text: '首页' },
    error: { text: '错误' },
    fund: {
      text: '基金',
      children: { fund: { text: '基金' }, hotmap: { text: '基金热图' } }
    },
    image: {
      text: '图像',
      children: {
        slice: { text: '图像切片' },
        crop: { text: '图像裁切' },
        view: { text: '图像浏览' }
      }
    },
    charts: {
      text: '图表',
      children: {
        line: { text: '线图' },
        function: { text: '函数图' },
        'home-loans': { text: '房贷图' }
      }
    },
    animation: {
      text: '动画',
      children: {
        transition: {
          text: '过渡动画',
          children: {
            fade: { text: '淡入淡出' },
            slide: { text: '滑出后滑入' },
            slip: { text: '滑入' }
          }
        },
        other: {
          text: '其他动画',
          children: {
            'moving-circle': { text: '移动的圆' }
          }
        }
      }
    },
    documentation: {
      text: '文本编辑',
      children: {
        edit: { text: '文档编辑' },
        monaco: { text: '代码编辑' }
      }
    },
    tools: {
      text: '工具',
      children: {
        'password-generator': { text: '密码生成器' }
      }
    },
    controls: {
      text: '控件',
      children: {
        navigation: {
          text: '导航栏',
          children: {
            navigation1: { text: '导航栏1' }
          }
        },
        draw: {
          text: '绘图',
          children: {
            'over-point-curve': { text: '过点曲线' }
          }
        }
      }
    },
    game: {
      text: '游戏',
      children: {
        minesweeper: {
          text: '扫雷',
          children: {
            normal: { text: '普通' }
          }
        }
      }
    },
    setting: {
      text: '设置'
    },
    GIS: {
      text: 'GIS',
      children: {
        cesium: {
          text: 'Cesium',
          children: {
            start: { text: '开始' },
            measurement: { text: '测量' }
          }
        }
      }
    }
  },

  setting: {
    language: '语言',
    theme: '主题',
    themeOption: {
      light: '亮色',
      dark: '暗色'
    }
  },
  canvas: {
    Image2Tiles: {
      rowNum: '行数',
      colNum: '列数',
      fileList: '文件列表',
      start: '开始处理',
      tip: '拖入文件或点击选择文件',
      processing: '处理中'
    }
  },
  chart: {
    line: {
      functionLine: {
        functionText: 'f(x)=(js代码)',
        functionName: '函数名称',
        defaultFunctionName: '测试函数',
        max: '最大值',
        min: '最小值',
        interval: '间隔值',
        smooth: '是否平滑',
        run: '运行',
        add: '添加'
      },
      HomeLoans: {
        money: '贷款金额',
        interestRate: '贷款利率',
        interestRateTip: '不合法',
        loanTerm: '贷款期限',
        inflation: '通货膨胀率',
        type: '计算类型',
        typeY: '年',
        typeM: '月'
      }
    }
  },
  tools: {
    passwordGenerator: {
      title: '密码生成器',
      Uppercase: '大写字母',
      Lowercase: '小写字母',
      Number: '数字',
      Special: '特殊字符'
    }
  }
};
