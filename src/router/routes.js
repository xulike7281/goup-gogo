import Layout from '@/layout'

/**
 * meta: {
 *  title: (string) 导航栏title
 *  icon: (string|function) 导航栏icon
 *  hideInMenu: (boolean=false) 设为true后在左侧菜单不会显示该页面选项
 *  hltInName: (string) 高亮的路由name active
 *  access: (null) 可访问该页面的权限数组 当前路由设置的权限会影响子路由
 * }
 */
const routes = [
    {
        path: '/',
        name: '_home',
        redirect: { name: 'Home' },
        meta: {
            hideInMenu: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/login')
    },
    {
        path: '/home',
        name: 'Home',
        redirect: { name: 'HomeIndex' },
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'HomeIndex',
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: '首页'
                }
            }
        ]
    },
    {
        path: '/infoManagement',
        name: 'infoManagement',
        redirect: { name: 'walnut' },
        meta: {
            title: '信息录入'
        },
        component: Layout,
        children: [
            {
                path: 'driver',
                name: 'driver',
                component: () => import('@/views/infoManagement/driver/index.vue'),
                meta: {
                    title: '司机录入'
                }
            },
            {
                path: 'dispatcher',
                name: 'dispatcher',
                component: () => import('@/views/infoManagement/dispatcher/index.vue'),
                meta: {
                    title: '调度员录入'
                },
                children:[
                  
                ]
        
            },
            {
                path: '/batch/detail',
                name: 'batchDetail',
                component: () => import('@/views/selfOperated/Batch/detailList.vue'),
                meta: {
                    hideInMenu: true,
                    title: '批次详情'
                }
            },
            {
                path: '/walnut/pair',
                name: 'pair',
                component: () => import('@/views/selfOperated/Walnut/pair.vue'),
                meta: {
                    hideInMenu: true,
                    title: '配对详情'
                }
            },
            {
                path: '/walnut/result',
                name: 'result',
                component: () => import('@/views/selfOperated/Walnut/pair.vue'),
                meta: {
                    hideInMenu: true,
                    title: '匹配结果'
                }
            },
            {
                path: '/walnut/create',
                name: 'walnutCreate',
                component: () => import('@/views/selfOperated/Walnut/create.vue'),
                meta: {
                    hideInMenu: true,
                    title: '新建核桃'
                }
            },
            {
                path: '/walnut/detail',
                name: 'walnutDetail',
                component: () => import('@/views/selfOperated/Walnut/detail.vue'),
                meta: {
                    hideInMenu: true,
                    title: '核桃详情'
                }
            },
      
 
        ]
    },
    
    {
        path: '/driverPassengerManagement',
        name: 'driverPassengerManagement',
        redirect: { name: 'FormLayout' },
        meta: {
            title: '司乘管理'
        },
        component: Layout,
        children: [
   
            {
                path: '/operationalLines',
                name: 'OperationalLines',
                component: () => import('@/views/driverPassengerManagement/operationalLines/index.vue'),
                meta: {
                    title: '运营线路'
                }
            },
      
 
            // {
            //     path: '/priceSetting',
            //     name: 'PriceSetting',
            //     component: () => import('@/views/driverPassengerManagement/priceSetting/index.vue'),
            //     meta: {
            //         title: '价格设置'
            //     }
            // },
            {
                path: '/driverOrder',
                name: 'DriverOrder',
                component: () => import('@/views/driverPassengerManagement/driverOrder/index.vue'),
                meta: {
                    title: '司机订单'
                }
            },
            {
                path: '/userOrder',
                name: 'UserOrder',
                component: () => import('@/views/driverPassengerManagement/userOrder/index.vue'),
                meta: {
                    title: '乘客订单'
                }
            },
            {
                path: '/clockIn',
                name: 'ClockIn',
                component: () => import('@/views/driverPassengerManagement/clockIn/index.vue'),
                meta: {
                    title: '打卡区域'
                }
            }
          
        ]
    },
    {
        path: '/financial',
        name: 'financial',
        redirect: { name: 'FormLayout' },
        meta: {
            title: '财务管理'
        },
        component: Layout,
        children: [
   
            {
                path: 'settlement',
                name: 'Settlement',
                component: () => import('@/views/financialManagement/Settlement/index.vue'),
                meta: {
                    title: '对账结算'
                }
            },
      
 
            {
                path: 'invoice',
                name: 'Invoice',
                component: () => import('@/views/financialManagement/Invoice/index.vue'),
                meta: {
                    title: '发票管理'
                }
            },
        ]
    },
    // {
    //     path: '/table',
    //     name: 'Table',
    //     redirect: { name: 'TableIndex' },
    //     meta: {
    //         title: '表格'
    //     },
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'TableIndex',
    //             component: () => import('@/views/table/index'),
    //             meta: {
    //                 title: '表格'
    //             }
    //         },
    //         {
    //             path: 'custom-search',
    //             name: 'TableCustomSearch',
    //             component: () => import('@/views/table/CustomSearch'),
    //             meta: {
    //                 title: '自定义搜索'
    //             }
    //         },
    //         {
    //             path: 'editable-table',
    //             name: 'TableEditableTable',
    //             component: () => import('@/views/table/EditableTable'),
    //             meta: {
    //                 title: '可编辑表格'
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/test',
    //     name: 'Test',
    //     redirect: { name: 'TestIndex' },
    //     meta: {
    //         title: '测试'
    //     },
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'TestIndex',
    //             component: () => import('@/views/Test'),
    //             meta: {
    //                 title: '测试'
    //             }
    //         }
    //     ]
    // },
    {
        path: '/401',
        name: 'error-401',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/401')
    },
    {
        path: '/500',
        name: 'error-500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/500')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error-404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/404')
    }
]

export default routes