// 首页
export const HOME_NAME = 'HomeIndex'
// 登录页
export const LOGIN_NAME = 'Login'
// iconfont cn
export const scriptUrl = '//at.alicdn.com/t/c/font_3980375_cbczlwhxpvl.js'

const APP_ENV = import.meta.env['VITE_VUE_APP_ENV'] || 'production'
export const isDev = APP_ENV === 'development'
export const isProd = APP_ENV === 'production'




export const taskStatusConfig =  [
    {
      value: '0',
      label: '启动运算',
    },
    {
      value: '1',
      label: '运算中',
    },
    {
      value: '2',
      label: '运算完成',
    },
    {
      value: '3',
      label: '运算异常',
    },
  ]

  export const walnutCategoryConfig =  [
    {
      value: '1',
      label: '皮特吴蛤蟆头',
    },
    {
      value: '2',
      label: '老北京蛤蟆头',
    },
    {
      value: '3',
      label: '山一代天地',
    },
    {
      value: '4',
      label: '山一代马蹄',
    },
  ]

  // ALL、NULL、S、A、B、C、D
  export const levelOptions =  [
    {
      value: 'ALL',
      label: '全部',
    },
    {
      value: 'NULL',
      label: '未评级',
    },
    {
      value: 'S',
      label: '等级S',
    },
    {
      value: 'A',
      label: '等级A',
    },
    {
      value: 'B',
      label: '等级B',
    },
    {
      value: 'C',
      label: '等级C',
    },
    {
      value: 'D',
      label: '等级D',
    },
  
  ]