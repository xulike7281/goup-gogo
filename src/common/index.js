// 导入请求的基础类
import http from './request'
const {
 Get, Post, Del, Put,Patch
} = http
const  env  = import.meta.env
let baseUrl = ''
if (env.MODE === 'development') { // 开发
  baseUrl = ''
} else { // 生产
  baseUrl = env.VITE_APP_HTTP_URL
}
const uploadImg = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/driver/uploadPhoto`, data,headers)


const handleInvoice = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/invoice/handleInvoice`, data,headers) // 
const getInvoiceList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/invoice/getInvoiceList`, data,headers) // 

const getClockInAreaDetail = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/clockInArea/getAreaDetail`, data,headers) // 
const getClockInAreaList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/clockInArea/getAreaList`, data,headers) // 

const getPassengerOrderDetail = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/order/passenger/getOrderDetail`, data,headers) // 
const getPassengerOrderList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/order/passenger/orderList`, data,headers) // 

const getDriverOrderDetail = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/order/driver/getOrderDetail`, data,headers) // 
const getDriverOrderList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/order/driver/orderList`, data,headers) // 

const addSite = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/site/addSite`, data,headers) // 

const getSiteDetail = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/site/getSiteDetail`, data,headers) // 围栏
const getSiteList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/site/getSiteList`, data,headers) // 围栏
const getLineList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/line/product/getLineProductList`, data,headers)
const addProductLine = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/line/product/add`, data,headers)


const editDriver = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/driver/editDriver`, data,headers)
const addDriver = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/driver/addDriver`, data,headers)
const getDriver = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/driver/getDriver`, data,headers)

const getDriverList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/driver/getDriverList`, data,headers)
const getDriverOrder = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/order/get`, data,headers)

const Login = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/user/login`, data,headers)





export {
    handleInvoice,
    getInvoiceList,
    getClockInAreaList,
    getClockInAreaDetail,
    getPassengerOrderDetail,
    getPassengerOrderList,
    getDriverOrderDetail,
    getDriverOrderList,
    getDriver,
    uploadImg,
    getSiteDetail,
    getSiteList,
    addSite,
    getLineList,
    addDriver,
    editDriver,
    getDriverList,
    getDriverOrder,
    // getOrder,
    addProductLine,
   
    Login,
}
