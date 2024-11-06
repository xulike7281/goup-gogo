<template>
    <div class="row start-cen">
   
      <div class="left-wrap">
        <div class="info-wrap column">
          <span class="ft16 fw500">母(左)</span>
          <span class="ft30 fw500 drawer-number">C1-4-2</span>
          <span class="ft18 fw500">边37.5/肚39/高33.5</span>
      </div>
        <div class="list-wrap">
          <div class="item-wrap row cen-center">
            <PlusOutlined />
            <span class="tip-box">顶</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined width="100" />
            <span class="tip-box">肚B</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined width="100" />
            <span class="tip-box">肚A</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined width="100" />
            <span class="tip-box">面B</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined width="100" />
            <span class="tip-box">面A</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined />
            <span class="tip-box">底</span>
          </div>
        </div>
      </div>

      <div class="w-info-wrap column cen-start">
        <div class="mt20 ft18 fw-bold">综合匹配率</div>
        <div class="ft36 fw-bold mt5">98.00%</div>
        <div class="size-wrap column cen-start">
          <p class="ft18 fw-bold mb10 b-border">尺寸</p>
          <span>边 : 0.00%</span>
          <span>肚 : 0.00%</span>
          <span>高 : 0.00%</span>
        </div>
        <div class="size-wrap column cen-start">
          <p class="ft18 fw-bold mb10 b-border">轮廓</p>
          <span>面 : 0.00%</span>
          <span>肚 : 0.00%</span>
          <span>顶 : 0.00%</span>
          <span>底 : 0.00%</span>
        </div>
        <div class="size-wrap column cen-start">
          <p class="ft18 fw-bold mb10 b-border">其他</p>
          <span>纹 : 0.00%</span>
          <span>重 : 0.00%</span>
          <span>色 : 0.00%</span>
        </div>
      </div>
      <div class="left-wrap">
        <div class="info-wrap column">
          <span class="ft16 fw500">母(左)</span>
          <span class="ft30 fw500 drawer-number">C1-4-2</span>
          <span class="ft18 fw500">边37.5/肚39/高33.5</span>
      </div>
        <div class="list-wrap">
          <div class="item-wrap row cen-center">
            <PlusOutlined />
            <span class="tip-box">顶</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined width="100" />
            <span class="tip-box">肚B</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined width="100" />
            <span class="tip-box">肚A</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined width="100" />
            <span class="tip-box">面B</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined width="100" />
            <span class="tip-box">面A</span>
          </div>
          <div class="item-wrap row cen-center">
            <PlusOutlined />
            <span class="tip-box">底</span>
          </div>
        </div>
      </div>
  
  
    </div>
    <br>
    <a-space size='large' class="btns-wrap">
      <a-button type="primary" size="large">
        <CameraOutlined />
        空格拍照
      </a-button>
      <a-button type="primary" size="large">
        <EnterOutlined />
        回车下一个
      </a-button>
      <a-button type="primary" size="large">
        <LogoutOutlined />
        提交结束录入
      </a-button>
  
    </a-space>
  </template>
  
  <script setup>
  import {
    PlusOutlined,
    CameraOutlined,
    EnterOutlined,
    LogoutOutlined
  } from '@ant-design/icons-vue';
  
  import { useRoute, useRouter } from 'vue-router';
  import * as api from '@/common/index'
  import { ref } from 'vue';
  import { onMounted } from 'vue';
  
  const router = useRouter()
  const route = useRoute()
  
  const data = ref({})
  
  
  const getData = () => {
    api.getWalnutDetail({
      id: route.query.batchId
    }).then(res => {
      if (res.code == '0') {
        data.value = res.data
      }
    })
  }
  onMounted(() => {
    getData()
  })
  // setTimeout(() => {
  //   const speaker = new SpeechSynthesisUtterance();
  //   speaker.text = "1-2-5"
  //   speaker.pitch = '30'
  //   speaker.rate = '0.8'
  //   console.log('[ speaker.voice ]-96', speaker.voice);
  
  //   speechSynthesis.speak(speaker)
  // }, 2000)
  </script>
  
  <style lang="scss" scoped>
  .left-wrap {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  
    .info {
      color: #4C515E;
  
    }
    .info-wrap{
      margin-bottom: 16px;
    }
    .drawer-number{
      color: #4B74FF;
      line-height: 42px;
    }
  }
  
  .list-wrap {
  
    display: grid;
    /*共三行，每行高*/
    grid-template-rows: 225px 225px 225px;
    /*共2列，每列列宽*/
    grid-template-columns: 300px 300px ;
    gap: 10px;
  
  
  }
  
  .item-wrap {
    position: relative;
    background-color: #ccc;
  
    .tip-box {
      position: absolute;
      bottom: -0;
      left: -0;
      font-size: 14px;
      font-weight: bold;
      width: 42px;
      height: 28px;
      background-color: #4A5471;
      line-height: 28px;
      text-align: center;
      color: #fff;
    }
  }
  .w-info-wrap{
    width: 190px;
    color: #4C515E;
    font-size: 16px;
    .size-wrap{
      line-height: 22px;
      margin-top: 40px;
      
    }
  }
 .b-border{
  position: relative;
  &::before{
    content: '';
    width: 90%;
    position: absolute;
    left: 5%;
    bottom: -5px;
    border-bottom: 3px #F8675C solid;

  }
 }
  .btns-wrap {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  </style>