<template>
  <div class="row">
    <div class="left-wrap">
      <div class="info-wrap">
        <div class="drawer-number">{{ data.drawerNumber }}</div>
      </div>
      <div class="list-wrap">
        <div class="item-wrap row cen-center">
          <!-- <PlusOutlined /> -->
          <span class="tip-box">顶</span>
          <img class="w100 h100" :src="data.imageTop" alt="">
        </div>
        <div class="item-wrap row cen-center">
          <!-- <PlusOutlined width="100" /> -->
          <span class="tip-box">肚B</span>
          <img class="w100 h100" :src="data.imageEdgeB" alt="">


        </div>
        <div class="item-wrap row cen-center">

          <!-- <PlusOutlined width="100" /> -->
          <span class="tip-box">肚A</span>
          <img class="w100 h100" :src="data.imageEdgeA" alt="">

        </div>
        <div class="item-wrap row cen-center">
          <!-- <PlusOutlined width="100" /> -->
          <span class="tip-box">面B</span>
          <img class="w100 h100" :src="data.imageFaceB" alt="">

        </div>
        <div class="item-wrap row cen-center">
          <!-- <PlusOutlined width="100" /> -->
          <span class="tip-box">面A</span>
          <img class="w100 h100" :src="data.imageFaceA" alt="">

        </div>
        <div class="item-wrap row cen-center">
          <!-- <PlusOutlined /> -->
          <span class="tip-box">底</span>
          <img class="w100 h100" :src="data.imageBottom" alt="">

        </div>
      </div>
    </div>
    <div class="right-wrap column">

    </div>
  </div>

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
    id: route.query.id
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

  .info-wrap {
    .drawer-number {
      color: #4B74FF;
      font-weight: 500;
      font-size: 30px;
    }

  }
}

.list-wrap {

  display: grid;
  grid-template-rows: 180px 180px;
  /*共三行，每行行高60px*/
  grid-template-columns: 240px 240px 240px;
  /*共三列，每列列宽60px*/
  gap: 10px;


}

.item-wrap {
  position: relative;
  background-color: #ccc;

  .tip-box {
    position: absolute;
    top: -0;
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

.right-wrap {
  margin-left: 20px;
  /* padding-top:200px ; */
  justify-content: space-between;

  .drawer-number {
    font-size: 30px;
    width: 220px;
    height: 80px;
    color: #28A826;
    font-weight: 500;
    background-color: #EBFFEC;
    border: 1px solid #28A826;
    margin-bottom: 30px;
  }

  .list-wrap {
    display: grid;
    grid-template-rows: 180px 180px 180px;
    /*共三行，每行行高60px*/
    grid-template-columns: 240px 240px 240px;
    /*共三列，每列列宽60px*/
    gap: 10px;


  }

  .weight-wrap {
    width: 200px;
  }
}

.btns-wrap {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>