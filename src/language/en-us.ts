
const ui:UIText ={
  sider: {
    home: { text: 'Home' },
    error: { text: 'Error' },
    fund: {
      text: 'Fund',
      children: { fund: { text: 'Fund' }, hotmap: { text: 'Hotmap' } }
    },
    image: {
      text: 'Image',
      children: {
        slice: { text: 'Image slice' },
        crop: { text: 'Image crop' },
        view: { text: 'Image viewer' }
      }
    },
    charts: {
      text: 'Charts',
      children: {
        line: { text: 'Line charts' },
        function: { text: 'Function charts' },
        'home-loans': { text: 'Home loans charts' }
      }
    },
    animation: {
      text: 'Animation',
      children: {
        transition: {
          text: 'Transition',
          children: {
            fade: { text: 'Fade' },
            slide: { text: 'Slide' },
            slip: { text: 'Slip' }
          }
        },
        other: {
          text: 'Other',
          children: {
            'moving-circle': { text: 'Moving circle' }
          }
        }
      }
    },
    documentation: {
      text: 'Documentation',
      children: {
        edit: { text: 'Text Editor' },
        monaco: { text: 'Code Editor' }
      }
    },
    tools: {
      text: 'Tools',
      children: {
        'password-generator': { text: 'Password Generator' }
      }
    },
    controls: {
      text: 'Controls',
      children: {
        navigation: {
          text: 'Navigation',
          children: {
            navigation1: { text: 'Navigation 1' }
          }
        },
        draw: {
          text: 'Draw',
          children: {
            'over-point-curve': { text: 'Over point curve' }
          }
        }
      }
    },
    game: {
      text: 'Game',
      children: {
        minesweeper: {
          text: 'Minesweeper',
          children: {
            normal: { text: 'Normal' }
          }
        }
      }
    },
    setting: {
      text: 'Setting',
    },
    GIS: {
      text: 'GIS',
      children: {
        cesium: {
          text: 'Cesium',
          children: {
            start: { text: 'Start' },
            measurement: { text: 'Measurement' }
          }
        }
      }
    }
  },

  setting: {
    language: 'Language',
    theme: 'Theme',
    themeOption: {
      light: 'Light',
      dark: 'Dark'
    }
  },
  canvas: {
    Image2Tiles: {
      rowNum: 'Row number',
      colNum: 'Column number',
      fileList: 'File list',
      start: 'Start processing',
      tip: 'Drop the file or click Select File',
      processing: 'Processing'
    }
  },
  chart: {
    line: {
      functionLine: {
        functionText: 'f(x)=(js code)',
        functionName: 'function name',
        defaultFunctionName: 'test function',
        max: 'max',
        min: 'min',
        interval: 'interval',
        smooth: 'smooth',
        run: 'run',
        add: 'add'
      },
      HomeLoans: {
        money: 'money',
        interestRate: 'interest rate',
        interestRateTip: 'illegal',
        loanTerm: 'loan term',
        inflation: 'inflation',
        type: 'Calculation type',
        typeY: 'year',
        typeM: 'month'
      }
    }
  },
  tools: {
    passwordGenerator: {
      title: 'Password Generator',
      Uppercase: 'Uppercase',
      Lowercase: 'Lowercase',
      Number: 'Number',
      Special: 'Special'
    }
  }
};
export default ui;