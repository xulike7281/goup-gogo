// 请求配置过程的代码是这样的 
import axios from 'axios'
import {mainStore} from '../stores/index'
import { useRoute,useRouter } from 'vue-router'
const store = mainStore();
import { getToken } from '@/common/auth'



const request = axios.create({
    // 配置对象
    baseURL: '', // 这里写自己的域名
    timeout: 300000,
    
    withCredentials: true, //异步请求携带Cookie  
    // headers: { // 这里的参数可以根据自己的需要设置 不需要的可以不设置
    //     // 'x-bgm-lang':localStorage.getItem('locale') || 'vi',
    //     // // "X-Requested-With": 'XMLHttpRequest',
    //     // "App-Version": "",
    //     // "Lng-Lat": "",
    //     // "System-Version": "",
    //     // "Mobile-Model": "",
    //     // "Device": "",
    // }
})
// 配置请求拦截器
request.interceptors.request.use((config) => {
    if(config.isShowLoading){
        store.setLoading(true)
    }

    if(!config.headers.Token){
        config.headers['USER-TOKEN'] = getToken() || ''
        config.headers.Authorization =`Bearer ${getToken() || ''}`
    }

    if(config.contentType){
        config.headers['Content-Type']=config.contentType
    }
    // config 配置对象 请求头
    return config
})

request.interceptors.response.use((resp) => {

    store.setLoading(false)

    // 请求成功
    if(resp.data.code == 210 && resp.data.msg == 'Invalid token'){
        // dispatch('Logout')
        store.setLoading(true)
        
        // window.location.href = `${window.location.origin}/login?rpath=${window.location.pathname}`
    }   
    return resp.data
}, (error) => {
    
    
    return Promise.reject(new Error('请求失败'))
})

const http = {
    Get(url, params,headers={},isShowLoading) {
        const config = {
            method: 'get',
            url: url,
            isShowLoading,
            contentType:headers['Content-Type']
        }
        if (params) {
            config.params = params
        }
        return request(config)
    },
    Post(url, params,headers={},isShowLoading) {
        const config = {
            method: 'post',
            url: url,
            isShowLoading,
            contentType:headers['Content-Type']
        }
        config
        if (params) {
            config.data = params
        }
        return request(config)
    },
    Del(url, params,headers={}) {
        if(params){
            const queryString = new URLSearchParams(params).toString()
            url = `${url}?${queryString}`

        }
        const config = {
            method: 'delete',
            url: url,
            headers,
        }
      
        return request(config)
    },
    Put(url, params,headers={},isShowLoading) {
        const config = {
            method: 'put',
            url: url,
            headers,
            isShowLoading
        }
        if (params) {
            config.data = params
            
        }
        return request(config)
    },
    Patch(url, params,headers={}) {
        if(params){
            const queryString = new URLSearchParams(params).toString()
            url = `${url}?${queryString}`

        }
        const config = {
            method: 'patch',
            url: url,
            headers
        }
        if (params) {
            config.data = params
            
        }
        return request(config)
    },
}

export default http
