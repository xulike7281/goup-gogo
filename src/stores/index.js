import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
    state: ()=>{
        return {
            userInfo:JSON.parse(localStorage.getItem('userInfo')) || {},
            showLoading:false,
            msg:'123'
        }
    },
    getters: {},
    actions: {
        actionChange() {
            this.msg = '222'
        },
        Logout(){
            // 修改的值
            this.userInfo = {}
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        },
        setLoading(value){
            this.showLoading = value
        },
       
    }
})