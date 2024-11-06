<template>
    <div @keyup="handleKeyUp">
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-row :gutter="[16, 16]">
            <a-col :span="12">
              <Card>
                <div class="item-wrap row cen-center">
                  <PlusOutlined />
                  <span class="tip-box" >上</span>
                </div>
              </Card>
            </a-col>
            <a-col :span="12">
              <Card>
                <div class="item-wrap row cen-center">
                  <PlusOutlined width="100" />
                  <span class="tip-box" >下</span>
                </div>
              </Card>
            </a-col>
            <a-col :span="12">
              <Card>
                <div class="item-wrap row cen-center">
                  <PlusOutlined width="100" />
                  <span class="tip-box" >前</span>
                </div>
              </Card>
            </a-col>
            <a-col :span="12">
              <Card>
                <div class="item-wrap row cen-center">
                  <PlusOutlined width="100" />
                  <span class="tip-box" >后</span>
                </div>
              </Card>
            </a-col>
            <a-col :span="12">
              <Card>
                <div class="item-wrap row cen-center">
                  <PlusOutlined width="100" />
                  <span class="tip-box" >左</span>
                </div>
              </Card>
            </a-col>
            <a-col :span="12">
              <Card>
                <div class="item-wrap row cen-center">
                  <PlusOutlined width="100" />
                  <span class="tip-box" >右</span>
                </div>
              </Card>
            </a-col>
            
          </a-row>
        </a-col>
   
      </a-row>
      <a-space size='large'  class="btns-wrap">
        <a-button>配置</a-button>
        <a-button>关闭摄像头</a-button>
        <a-button>空格拍照</a-button>
      </a-space>
    </div>
  </template>
  
  <script setup>
  import { Radio, Card } from 'ant-design-vue'
  import {
    PlusOutlined,
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
  } from '@ant-design/icons-vue';
import { onMounted, onUnmounted } from 'vue';

const handleSpace = (e)=>{
        if(e.code == 'Space'){
            console.log('按下空格');
        }
}

onMounted(()=>{
    window.addEventListener('keydown',handleSpace)
})
onUnmounted(()=>{
    window.removeEventListener('keydown',handleSpace)
})
  </script>
  
  <style lang="scss" scoped>
  .item-wrap{
    height: 280px;
    position: relative;
    .tip-box{
      position: absolute;
      top:-24px;
      left: -20px;
      color: #1677FF;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .btns-wrap{
    margin-top: 16px;
  }
  </style>