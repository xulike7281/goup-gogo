<template>

  <div class="create-wrap w100">
    <div class="btns">
      <a-button type="primary" @click="callCamera" style="margin-right: 10px">开启摄像头</a-button>
      <!--关闭摄像头-->
      <!-- <a-button type="primary" @click="closeCamera" style="margin-right: 10px">关闭摄像头</a-button> -->
      <a-button type="primary" @click="photograph" style="margin-right: 10px">空格预览</a-button>
      <a-button type="primary" @click="handleNext" style="margin-right: 10px"> {{ source == 'edit' ? '回车修改' : '回车提交' }}
      </a-button>
      <!-- <a-button type="primary" @click="uploadImg" style="margin-right: 10px"> 提交结束录入 </a-button> -->
    </div>
    <a-row>
      <a-col>
        <div class="top">
          <div class="left" v-for="(item, idx) in devicesIds" :key="idx">
            <span @click="handleVideo(item)" class="name row cen-center">{{ cameraConfig[item] || '未配置' }}</span>
            <div class="video-wrap" style="background-color: black;">
              <video class="video-box" :ref="el => getRef(el, idx, 'video')" width="400" height="300" autoplay></video>
              <video class="audio-box" :ref="el => getRef(el, idx, 'audio')" width="400" height="300" autoplay></video>
            </div>
          </div>

        </div>
      </a-col>
      <a-col>

        <div class="photo">
          <div class="layer-info row cen-center">
            {{ source == 'edit' ? detailData.drawerNumber : `C${nextData.layer}-${nextData.x}-${nextData.y}` }}
          </div>
          <div class="img-list-wrap">
            <div class="img-list" v-for="(item, idx) in devicesIds" :key="idx">
              <!-- <h1>照片{{ idx }}</h1> -->
              <img class="img" :ref="el => getRef(el, idx, 'img')" src="#" alt="">
              <canvas :ref="el => getRef(el, idx, 'canvas')" width="1000" height="750"
                style="background-color: black;position: fixed;top: -999px;"></canvas>
            </div>
          </div>

        </div>

        <a-space>
          <a-input-number size="large" v-model:value="weight" style="margin-top: 40px;" step="0.1" :precision="2"
            addonAfter="克" />
        </a-space>
      </a-col>

    </a-row>
    <a-modal v-model:open="openConfigModal" :width="320" title="摄像头配置" okText="确定" cancelText="取消" @ok="handleOk"
      @cancel="openConfigModal = false">
      <a-select v-model:value="directionValue" style="width: 100%;margin: 20px 0;" allowClear placeholder="摄像头位置"
        :options="directionOptions"></a-select>
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { ref } from 'vue';
import * as api from '@/common/index'
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { reject } from 'lodash-es';
const route = useRoute()
const batchId = route.query.batchId
const openConfigModal = ref(false);
const nextData = ref({})
const detailData = ref({})
const source = route.query.source
const directionOptions = ref([
  {
    value: '上',
    label: '上',
    disabled: false
  },
  {
    value: '下',
    label: '下',
    disabled: false

  },
  {
    value: '面A',
    label: '面A',
    disabled: false

  },
  {
    value: '面B',
    label: '面B',
    disabled: false

  },
  {
    value: '肚A',
    label: '肚A',
    disabled: false

  },
  {
    value: '肚B',
    label: '肚B',
    disabled: false
  },
])

const cameraIds = [
  {
    title: '肚A',
    id: "66212a9ae30fb30aef2979ae6f44848a27d7a5c5c033a66bd412f0a8e3e8a5a1"
  },
  {
    title: '肚B',
    id: "d851ddade5f91062b1f266f16adbc1af7bce47200aab00e3c3dc8210ccb7dba9"
  },
  {
    title: '面A',
    id: "66212a9ae30fb30aef2979ae6f44848a27d7a5c5c033a66bd412f0a8e3e8a5a1"
  },
  {
    title: '顶',
    id: "40e8a2cdbda307f39ae19eb9135fd43ff7ea863f2c6c74b738379be02937de92"
  },
  {
    title: '底',
    id: "b6b1343907cfe20a983c9d7bd4555aa410cc07a53080a8cf07a4f8c05257efd0"
  },
  {
    title: '面B',
    id: "acb038812779ab6ff52b72b5c78105cbd33100b281e642608d9f7e8cb8141a7e"
  },
  {
    title: '左',
    id: "888d4105bca1843d3f426bbff8f1d155a769d6d4ac7a47b5a83652edbc77d15b"
  },
]
const directionValue = ref(undefined)
const cameraConfig = ref({})
const currentDeviceId = ref('')

const weight = ref(undefined)
const videoRefList = ref([])
const audioRefList = ref([])
const canvasRefList = ref([])
const imgRefList = ref([])
let loading = false
let devicesIds = ref([])//摄像头数组


cameraConfig.value = JSON.parse(localStorage.getItem('cameraConfig')) || {}




//

const fileList = ref([]);







const getRef = (el, idx, source) => {
  if (el) {
    if (source == 'video') {
      videoRefList.value.push(el)
    }
    if (source == 'audio') {
      audioRefList.value.push(el)
    }
    if (source == 'img') {
      imgRefList.value.push(el)
    }
    if (source == 'canvas') {
      canvasRefList.value.push(el)
    }
  }
}

const init = async () => {
  try {
    let devices = await navigator.mediaDevices.enumerateDevices();
    console.log('devices: ', devices);
    devices.forEach((device) => {
      if (device.label.indexOf('RGB') != -1 && device.kind === 'videoinput') {
        devicesIds.value.push(device.deviceId);
      }
    });
  } catch (error) {
    console.error('获取不到相机: ', error);
    devicesIds.value = ['', '', '', '', '', '']
  }


}
const imgMap = {
  '上': 'imageTop',
  '下': 'imageBottom',
  '肚A': 'imageEdgeA',
  '肚B': 'imageEdgeB',
  '面A': 'imageFaceA',
  '面B': 'imageFaceB',
}

// 拍照
const photograph = () => {
  fileList.value = []
  devicesIds.value.forEach((item, index) => {
    let ctx = canvasRefList.value[index].getContext("2d");
    // 把当前视频帧内容渲染到canvas上
    ctx.drawImage(videoRefList.value[index], -460, -360, 2000, 1500);
    // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
    let imgBase64 = canvasRefList.value[index].toDataURL("image/jpeg");

    imgRefList.value[index].src = imgBase64
    /**------------到这里为止，就拿到了base64位置的地址，后面是下载功能----------*/
    // 由字节转换为KB 判断大小
    let str = imgBase64.replace("data:image/jpeg;base64,", "");
    let strLength = str.length;
    let fileLength = parseInt(strLength - (strLength / 8) * 2); // 图片尺寸  用于判断
    let size = (fileLength / 1024).toFixed(2);
    // 转换为Blob  
    let blob = dataURLtoBlob(imgBase64);
    // 创建一个File对象  
    let file = new File([blob], imgMap[cameraConfig.value[item]] + '.png', { type: 'image/png' });
    fileList.value.push(file)
    // 保存到本地
    // let ADOM = document.createElement("a");
    // ADOM.href = imgBase64;
    // ADOM.download = new Date().getTime() + ".jpeg";
    // ADOM.click();
  })

  return new Promise((resolve, reject) => {
    resolve(fileList.value)
  })
}
const uploadImg = () => {

  // 将所有待上传的文件加入formData
  const formData = new FormData();
  fileList.value.forEach((file) => {
    formData.append('files', file, file.name);
  });
  console.log('[ formData ]-59', formData);
  return api.uploadImgBatch(
    formData
    , {
      'Content-Type': 'multipart/form-data'
    })

};
const getImgUrl = (name, list = []) => {
  return list.find(item => item.name == name + '.png') ? list.find(item => item.name == name + '.png')['url'] : ''
}



const mdWalnut = async () => {
  console.log('fileList.value.length: ', fileList.value.length);
  if (fileList.value.length) {
      const res = await uploadImg()
      console.log('res: 22', res);
      if (res.code == '0') {
        const resList = res.data.list || []
        // message.success(`上传成功`);
        resList.forEach((item, i) => {
          fileList.value[i].url = item.url
        })
        console.log('getImgUrl(.value): ', getImgUrl('imageTop', fileList.value));
        console.log('fileList.value: ', fileList.value);
        // return
        console.log('weight.value: ', weight.value);
      } else {
        message.error(`上传图片失败,请重新操作`);
        return
      }

  }

  if (!weight.value || weight.value > 35 || weight.value < 5) {
    message.error(`克重错误`);
    return
  }

  api.mdWalnut({
    id: route.query.id,
    imageTop: getImgUrl('imageTop', fileList.value) || detailData.value.imageTop,
    imageBottom: getImgUrl('imageBottom', fileList.value) || detailData.value.imageBottom,
    imageFaceA: getImgUrl('imageFaceA', fileList.value) || detailData.value.imageFaceA,
    imageFaceB: getImgUrl('imageFaceB', fileList.value) || detailData.value.imageFaceB,
    imageEdgeA: getImgUrl('imageEdgeA', fileList.value) || detailData.value.imageEdgeA,
    imageEdgeB: getImgUrl('imageEdgeB', fileList.value) || detailData.value.imageEdgeB,
    weight: weight.value,
  }).then(result => {
    if (result.code == '0') {
      message.success(`修改成功`);
      getData()
      // getNextData()

    } else {
      message.error(`修改失败`);
    }
  })
  return

  // .then(res => {
  //   console.log('[ res ]-61', res);
  //   message.success(`上传成功`);
  //   fileList.value = []
  //   imgRefList.value.forEach(el => {
  //     el.src = '#'
  //   })
  // }).catch(err => {
  //   message.error(`上传失败`);

  // })

}
const handleNext = () => {

  // if (fileList.value.length !== 6) {
  //   message.error(`请先按空格拍照`);
  //   return
  // }


  mdWalnut()
}

// 开启摄像头
const callCamera = () => {
  devicesIds.value.forEach((item, index) => {
    console.log('item: ', item);
    // navigator.mediaDevices .getUserMedia({ video: true, audio: true })
    //     .then((stream) => {
    //       video.srcObject = stream // 将捕获的视频流传递给video  放弃window.URL.createObjectURL(stream)的使用
    //       video.play() //  播放视频
    //       audio.srcObject = stream
    //       audio.play()
    //     })
    // H5调用电脑摄像头API
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: { exact: item },
        },
      })
      .then((stream) => {
        // console.log(success,'流')
        // 摄像头开启成功
        videoRefList.value[index].srcObject = stream;
        // // 实时拍照效果
        videoRefList.value[index].play();
        videoRefList.value[index].srcObject = stream;
        audioRefList.value[index].play();

      })
      .catch((error) => {
        console.error("摄像头开启失败，请检查摄像头是否可用！");
      });
  })

}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// 关闭摄像头
// const closeCamera = () => {
//   if (!this.$refs["video"].srcObject) return;
//   let stream = this.$refs["video"].srcObject;
//   let tracks = stream.getTracks();
//   tracks.forEach((track) => {
//     track.stop();
//   });
//   this.$refs["video"].srcObject = null;
// }




const handleVideo = (id) => {
  console.log('id: ', id);
  openConfigModal.value = true

  currentDeviceId.value = id
  directionValue.value = undefined

}


const handleOk = (value) => {
  openConfigModal.value = false
  // cameraConfig.value.push({
  //   direction:directionValue.value,
  //   deviceId:
  // })
  cameraConfig.value[currentDeviceId.value] = directionValue.value
  // directionOptions.value.forEach(item=>{
  //   console.log('item: ', item);
  //   console.log('directionValue.value: ', directionValue.value);
  //   if(item.value == directionValue.value){
  //     item.disabled = true
  //   }
  //   // directionValue.value  = undefined
  //   // currentDeviceId.value = undefined
  // })
  localStorage.setItem('cameraConfig', JSON.stringify(cameraConfig.value))
}
const handleKeyboard = (e) => {
  if (e.code == 'Space') {
    console.log('按下空格');
    photograph()
  }
  if (e.code == 'Enter') {
    console.log('回车');
    handleNext()

  }
}
const getNextData = () => {
  api.getNextXY({ batchId: Number(batchId) }).then(res => {
    console.log('res: ', res);
    if (res.code == '0') {
      nextData.value = res.data
    }
  })
}
const getData = () => {
  api.getWalnutDetail({
    id: route.query.id
  }).then(res => {
    if (res.code == '0') {
      detailData.value = res.data
      weight.value = res.data.weight
      const imgList = [res.data.imageBottom, res.data.imageEdgeA, res.data.imageEdgeB, res.data.imageFaceA, res.data.imageFaceB, res.data.imageTop]
      console.log('imgList: ', imgList);
      imgList.forEach((url, index) => {
        console.log('url: ', url);
        imgRefList.value[index].src = url

      })
    }
  })
}

onMounted(() => {
  init();
  setTimeout(() => {
    callCamera()
  }, 1000)

  if (source == 'edit') {
    getData()
  } else {
    // getNextData()
  }
  window.addEventListener('keydown', handleKeyboard)



})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard)
})
</script>
<style scoped lang='scss'>
.create-wrap {
  width: 100%;
  padding-bottom: 80px;

  .top,
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;
  }

  .video-wrap {
    width: 300px;
    height: 225px;
    position: relative;
    overflow: hidden;


    .video-box {
      position: absolute;
      top: -25%;
      left: -18%;
      scale: 1.5;
    }
  }

  .top {
    display: grid;
    grid-template-rows: 1fr 1fr;
    /* 定义2行高度各占1份 */
    grid-template-columns: 300px 300px;
    /* 定义2列宽度各占1份 */
    gap: 10px;
    /* 设置行与行、列与列之间的间隙为10px */
    margin-right: 20px;

    .left {
      position: relative;

      .name {
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        z-index: 1;
        background-color: #4A5471;
        height: 28px;
        padding: 0 10px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
      }
    }

  }

  .img-wrap {
    background-color: black;
    width: 300px;
    height: 225px;

    .img-box {
      width: 100%;
      /* position: absolute;
      top: -50%;
      left: -50%; */
    }
  }




  .photo {
    .layer-info {
      width: 220px;
      height: 80px;
      color: #28A826;
      border: 1px solid #28A826;
      background-color: #EBFFEC;
      font-weight: 500;
      font-size: 30px;
      color: #28A826;
      margin-bottom: 20px;
    }

    .img-list-wrap {
      display: grid;
      grid-template-rows: 1fr 1fr;
      /* 定义2行高度各占1份 */
      grid-template-columns: 200px 200px 200px;
      /* 定义2列宽度各占1份 */
      gap: 20px;

      .img-list {
        width: 200px;
        height: 150px;
        background-color: black;

        .img {
          width: 100%;
        }
      }



    }
  }

}

.btns {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #E7EBF8;
  // padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
</style>