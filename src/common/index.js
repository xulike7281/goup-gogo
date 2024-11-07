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


const getSiteList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/site/getSiteList`, data,headers) // 围栏
const getLineList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/line/product/getLineProductList`, data,headers)


const editDriver = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/driver/editDriver`, data,headers)
const addDriver = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/driver/addDriver`, data,headers)

const getDriverList = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/driver/getDriverList`, data,headers)
const getDriverOrder = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/order/get`, data,headers)

const Login = (data,headers) => Post(`${baseUrl}/goupCarpoolSupplierApi/user/login`, data,headers)

const getCategoryList = (data) => Get(`${baseUrl}/api/v1/content/category/page`, data)

const addCategory = (data) => Post(`${baseUrl}/api/v1/content/category`, data)

const delCategory = (data) => Del(`${baseUrl}/api/v1/content/category/${data.id}`, data)

const mdCategory = (data) => Put(`${baseUrl}/api/v1/content/category/${data.id}`, data)


const searchWalnut = (data) => Get(`${baseUrl}/api/v1/content/walnut/page`,data)


const getWalnutList = (data) => Get(`${baseUrl}/api/v1/content/walnut/page`, data)

const getWalnutDetail = (data) => Get(`${baseUrl}/api/v1/content/walnut/${data.id}/form`, data)

const getAlgorithm = (data) => Get(`${baseUrl}/api/v1/content/algorithm/page`, data)

const addAlgorithm = (data,headers) => Post(`${baseUrl}/api/v1/content/algorithm`, data,headers)


const delAlgorithm = (data) => Del(`${baseUrl}/api/v1/content/algorithm/${data.id}`, data)

const mdAlgorithm = (data) => Put(`${baseUrl}/api/v1/content/algorithm/${data.id}`, data)

const addBatch = (data,headers) => Post(`${baseUrl}/api/v1/content/batch`, data,headers)

const mdBatch = (data) => Put(`${baseUrl}/api/v1/content/batch/${data.id}`, data)

const getBatchDetail = (data,headers) => Get(`${baseUrl}/api/v1/content/batch/${data.id}/form`, data,headers)


const getBatchList = (data) => Get(`${baseUrl}/api/v1/content/batch/page`, data)

const delBatch = (data) => Del(`${baseUrl}/api/v1/content/batch/${data.id}`, data)

const mdBatchStatus = (data) => Patch(`${baseUrl}/api/v1/content/batch/${data.id}/status`, data)

const addDictType = (data,headers) => Post(`${baseUrl}/api/v1/dict/types`, data,headers)

const getCommonOptions = (data) => Get(`${baseUrl}/api/v1/dict/${data.typeCode}/options`, data)

const getCommonList = (data) => Get(`${baseUrl}/api/v1/dict/page`, data)


const addDict = (data,headers) => Post(`${baseUrl}/api/v1/dict`, data,headers)
const mdDict = (data,headers) => Put(`${baseUrl}/api/v1/dict/${data.id}`, data,headers)
const delDict = (data,headers) => Del(`${baseUrl}/api/v1/dict/${data.id}`, data,headers)

const getRuleList = (data) => Get(`${baseUrl}/api/v1/content/rule/page`, data)
const addRule = (data) => Post(`${baseUrl}/api/v1/content/rule/page`, data)
const delRule= (data) => Del(`${baseUrl}/api/v1/content/rule/${data.id}`, data)



const getNextXY = (data) => Get(`${baseUrl}/api/v1/content/walnut/${data.batchId}/getNextXY`, data)
const createdWalnut = (data) => Post(`${baseUrl}/api/v1/content/walnut`, data)
const mdWalnut = (data) => Put(`${baseUrl}/api/v1/content/walnut/${data.id}`, data)






export {
    uploadImg,
    getSiteList,
    getLineList,
    addDriver,
    editDriver,
    getDriverList,
    getDriverOrder,
    // getOrder,
   
   
    Login,
}
