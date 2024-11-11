<template>

  <a-card>
    <a-space class="row cen-space">
      <a-form :model="searchFormState" name="horizontal_login" layout="inline" autocomplete="off">
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="searchFormState.name" allowClear placeholder="姓名" />
        </a-form-item>
        <a-form-item label="手机号" name="cellphone">
          <a-input v-model:value="searchFormState.cellphone" allowClear placeholder="手机号" />
        </a-form-item>
        <a-form-item label="车牌号" name="plateNumber">
          <a-input v-model:value="searchFormState.plateNumber" allowClear placeholder="车牌号" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="getData">搜索</a-button>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="showModal">添加司机</a-button>
    </a-space>
  </a-card>
  <br />
  <a-card>
    <a-table :columns="columns" :data-source="tableData" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="link" size="small" @click="modifyData(record)"> 修改</a-button>
          <!-- <a-popconfirm title="是否删除" ok-text="是" cancel-text="否" @confirm="handleDel(record)">
            <a-button type="link" size="small"> 删除</a-button>
          </a-popconfirm> -->
        </template>
      </template>

    </a-table>
    <br>
    <a-space class="row cen-end">
      <a-pagination v-model:current="currentPage" v-model:page-size="pageSize" :total="total" showSizeChanger
        :show-total="total => `共有 ${total} 条数据`" @change="getData" />
    </a-space>

  </a-card>

  <a-modal v-model:open="openAddModal" :width="960" :title="isEdit ? '编辑司机' : '添加司机'" okText="确定" cancelText="取消"
    @ok="handleOk" @cancel="handleCancel">
    <a-form style="gap: 20px" ref="formRef" labelAlign="right" autocomplete="off" :model="formState" :rules="rules"
      :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="12">
          <a-form-item label="姓名" name="name">
            <a-input v-model:value="formState.name" placeholder="姓名" />
          </a-form-item>
          <a-form-item label="手机号" name="cellphone">
            <a-input v-model:value="formState.cellphone" placeholder="手机号" />
          </a-form-item>
          <a-form-item label="身份证号" name="idCard">
            <a-input v-model:value="formState.idCard" placeholder="身份证号" />
          </a-form-item>
          <a-form-item label="身份证正面" name="idCardFront">
            <a-upload v-model:file-list="idCardFrontFileList" :maxCount="1" list-type="picture"
              :before-upload="idCardFrontUpload" @change="idCardFrontUploadChange">
              <a-button>
                <upload-outlined></upload-outlined>
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="身份证反面" name="idCardBack" class="vertical-form-item">
            <a-upload v-model:file-list="idCardBackFileList" :maxCount="1" list-type="picture"
              :before-upload="idCardBackUpload" @change="idCardBackUploadChange">
              <a-button>
                <upload-outlined></upload-outlined>
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="驾驶证" name="licencePhoto" class="vertical-form-item">
            <a-upload v-model:file-list="licencePhotoFileList" :maxCount="1" list-type="picture"
              :before-upload="licencePhotoUpload" @change="licencePhotoUploadChange">
              <a-button>
                <upload-outlined></upload-outlined>
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="网约车资格证" name="netLicencePhoto" class="vertical-form-item">
            <a-upload v-model:file-list="netLicencePhotoFileList" :maxCount="1" list-type="picture"
              :before-upload="netLicencePhotoUpload" @change="netLicencePhotoUploadChange">
              <a-button>
                <upload-outlined></upload-outlined>
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="车牌号" name="plateNumber">
            <a-input v-model:value="formState.plateNumber" placeholder="车牌号" />
          </a-form-item>
          <a-form-item label="车辆品牌" name="carBrand">
            <a-input v-model:value="formState.carBrand" placeholder="车辆品牌" />
          </a-form-item>
          <a-form-item label="车型" name="carModel">
            <a-input v-model:value="formState.carModel" placeholder="车型" />
          </a-form-item>
          <a-form-item label="车辆颜色" name="carColor">
            <a-input v-model:value="formState.carColor" placeholder="车辆颜色" />
          </a-form-item>
          <a-form-item label="准乘人数" name="seats">
            <a-input v-model:value="formState.seats" placeholder="准乘人数" />
          </a-form-item>
          <a-form-item label="行驶本" name="driveLicensePhoto" class="vertical-form-item">
            <a-upload v-model:file-list="driveLicensePhotoFileList" :maxCount="1" list-type="picture"
              :before-upload="driveLicensePhotoUpload" @change="driveLicensePhotoUploadChange">
              <a-button>
                <upload-outlined></upload-outlined>
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="保险单" name="insurancePhoto" class="vertical-form-item">
            <a-upload v-model:file-list="insurancePhotoFileList" :maxCount="1" list-type="picture"
              :before-upload="insurancePhotoUpload" @change="insurancePhotoUploadChange">
              <a-button>
                <upload-outlined></upload-outlined>
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="网约车运输证" name="roadPermitPhoto" class="vertical-form-item">
            <a-upload v-model:file-list="roadPermitPhotoFileList" :maxCount="1" list-type="picture"
              :before-upload="roadPermitPhotoUpload" @change="roadPermitPhotoUploadChange">
              <a-button>
                <upload-outlined></upload-outlined>
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>
  </a-modal>
</template>

<script setup>
import { onMounted, ref, reactive, toRaw } from 'vue';
import * as api from '@/common/index'
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { UploadOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const env = import.meta.env
const openAddModal = ref(false);
const data = ref([])
const tableData = ref([])
const isEdit = ref(false)
const formRef = ref(null);
const currentId = ref('')
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const labelCol = {
  span: 6,
};
const wrapperCol = {
  span: 18,
};
const idCardFrontFileList = ref([])
const idCardBackFileList = ref([])
const licencePhotoFileList = ref([])
const netLicencePhotoFileList = ref([])
const driveLicensePhotoFileList = ref([])
const insurancePhotoFileList = ref([])
const roadPermitPhotoFileList = ref([])
const searchFormState = ref({
  name: '',// 姓名
  cellphone: '',// 手机号
  plateNumber: ''// 车牌号
});

const formState = ref({
  name: '',// 司机姓名
  cellphone: '',// 手机号
  idCard: '', // 身份证号
  idCardFront: '',// 身份证正面
  idCardBack: '',// 身份证反面
  licencePhoto: '',// 驾驶证
  netLicencePhoto: '', //网约车资格证(图片地址)
  plateNumber: '', //车牌号
  carBrand: '', //车辆品牌
  carModel: '', //车辆型号
  carColor: '', //车辆颜色
  seats: '', // 人数
  driveLicensePhoto: '', //行驶本
  id: '', //车辆id(修改必填) 
  insurancePhoto: '', //保险单(图片地址) ,
  roadPermitPhoto: '', // 网约车运输证(图片地址)
});
const rules = {
  name: [
    {
      required: true,
      message: '请填写姓名',
      trigger: 'change',
    },
  ],
  cellphone: [
    {
      required: true,
      message: '请填写手机号',
      trigger: 'blur',
    },
  ],
  idCard: [
    {
      required: true,
      message: '请填写身份证号',
      trigger: 'blur',
    },
  ],
  idCardFront: [
    {
      required: true,
      message: '请上传身份证正面照片',
      trigger: 'blur',
    },
  ],
  idCardBack: [
    {
      required: true,
      message: '请上传身份证反面照片',
      trigger: 'blur',
    },
  ],
  licencePhoto: [
    {
      required: true,
      message: '请上传驾驶证照片',
      trigger: 'blur',
    },
  ],
  netLicencePhoto: [
    {
      required: true,
      message: '请上传网约车资格证照片',
      trigger: 'blur',
    },
  ],
  plateNumber: [
    {
      required: true,
      message: '请填写车牌号',
      trigger: 'blur',
    },
  ],
  carBrand: [
    {
      required: true,
      message: '请填写车辆品牌',
      trigger: 'blur',
    },
  ],
  carModel: [
    {
      required: true,
      message: '请填写车辆型号',
      trigger: 'blur',
    },
  ],
  carColor: [
    {
      required: true,
      message: '请填写车辆颜色',
      trigger: 'blur',
    },
  ],
  seats: [
    {
      required: true,
      message: '请填写准乘人数',
      trigger: 'blur',
    },
  ],
  driveLicensePhoto: [
    {
      required: true,
      message: '请上传行驶本照片',
      trigger: 'blur',
    },
  ],
  insurancePhoto: [
    {
      required: true,
      message: '请上传保险单照片',
      trigger: 'blur',
    },
  ],
  roadPermitPhoto: [
    {
      required: true,
      message: '请上传网约车运输证照片',
      trigger: 'blur',
    },
  ],
};


const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'cellphone',
    key: 'cellphone',
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    key: 'idCard',
  },
  {
    title: '车牌号',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  // {
  //   title: '备注',
  //   dataIndex: 'remark',
  //   key: 'remark',
  // },
  {
    title: '操作',
    key: 'action',
  },
];

const fileList = ref([])
const idCardFrontUpload = (file) => {
  uploadImg('idCardFront', file).then(res => {
    console.log('res222: ', res);
    if (res.code == 200) {
      formState.value.idCardFront = res.data
    }
  })
  return false
}
const idCardFrontUploadChange = (files) => {
  console.log('idCardFrontUploadChange: ', files);
  if (!files.fileList.length) {
    formState.value.idCardFront = ''
  }
}
const idCardBackUpload = (file) => {
  uploadImg('idCardFront', file).then(res => {
    console.log('res222: ', res);
    if (res.code == 200) {
      formState.value.idCardBack = res.data
    }
  })
  return false
}
const idCardBackUploadChange = (files) => {
  console.log('idCardFrontUploadChange: ', files);
  if (!files.fileList.length) {
    formState.value.idCardBack = ''
  }
}
const licencePhotoUpload = (file) => {
  uploadImg('idCardFront', file).then(res => {
    console.log('res222: ', res);
    if (res.code == 200) {
      formState.value.licencePhoto = res.data
    }
  })
  return false
}
const licencePhotoUploadChange = (files) => {
  console.log('idCardFrontUploadChange: ', files);
  if (!files.fileList.length) {
    formState.value.licencePhoto = ''
  }
}
const netLicencePhotoUpload = (file) => {
  uploadImg('idCardFront', file).then(res => {
    console.log('res222: ', res);
    if (res.code == 200) {
      formState.value.netLicencePhoto = res.data
    }
  })
  return false
}
const netLicencePhotoUploadChange = (files) => {
  console.log('idCardFrontUploadChange: ', files);
  if (!files.fileList.length) {
    formState.value.netLicencePhoto = ''
  }
}
const driveLicensePhotoUpload = (file) => {
  uploadImg('idCardFront', file).then(res => {
    console.log('res222: ', res);
    if (res.code == 200) {
      formState.value.driveLicensePhoto = res.data
    }
  })
  return false
}
const driveLicensePhotoUploadChange = (files) => {
  console.log('idCardFrontUploadChange: ', files);
  if (!files.fileList.length) {
    formState.value.driveLicensePhoto = ''
  }
}
const insurancePhotoUpload = (file) => {
  uploadImg('idCardFront', file).then(res => {
    console.log('res222: ', res);
    if (res.code == 200) {
      formState.value.insurancePhoto = res.data
    }
  })
  return false
}
const insurancePhotoUploadChange = (files) => {
  console.log('idCardFrontUploadChange: ', files);
  if (!files.fileList.length) {
    formState.value.insurancePhoto = ''
  }
}
const roadPermitPhotoUpload = (file) => {
  uploadImg('idCardFront', file).then(res => {
    console.log('res222: ', res);
    if (res.code == 200) {
      formState.value.roadPermitPhoto = res.data
    }
  })
  return false
}
const roadPermitPhotoUploadChange = (files) => {
  console.log('idCardFrontUploadChange: ', files);
  if (!files.fileList.length) {
    formState.value.roadPermitPhoto = ''
  }
}
const getData = () => {
  api.getDriverList({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    driverCellphone: '',
    supplierCode: 'first',
    ...searchFormState,
  }).then(res => {
    console.log('[ res ]-17', res);
    if (res.code == 200) {

      tableData.value = res.data
      total.value = res.data.total

    }
  })
}
const submitSearch = () => {

}
const resetForm = () => {

  console.log('[  ]-127',);
  console.log('[ formRef.value ]-130', formRef.value);
  formState.name = ''
  formState.remark = ''
  formRef.value.resetFields();
};

onMounted(() => {
  getData()

})
const showModal = () => {
  isEdit.value = false
  openAddModal.value = true;
};
const handleOk = e => {
  console.log(e);
  formRef.value.validate().then(() => {
    let fn = isEdit.value ? 'editDriver' : 'addDriver'
    let driverInfoDTO = {
      "cellphone": formState.value.cellphone,
      "idCard": formState.value.idCard,
      "idCardBack": formState.value.idCardBack,
      "idCardFront": formState.value.idCardFront,
      "licencePhoto": formState.value.licencePhoto,
      "name": formState.value.name,
      "netLicencePhoto": formState.value.netLicencePhoto
    }
    let carInfoDTO = {
      "carBrand": formState.value.carBrand,
      "carColor": formState.value.carColor,
      "carModel": formState.value.carModel,
      "driveLicensePhoto": formState.value.driveLicensePhoto,
      "insurancePhoto": formState.value.insurancePhoto,
      "plateNumber": formState.value.plateNumber,
      "roadPermitPhoto": formState.value.roadPermitPhoto,
      "seats": formState.value.seats

    }
    if (isEdit.value) {
      driverInfoDTO.id = currentId.value
      carInfoDTO.id = formState.value.carId
    }

    console.log('fn: ', fn);
    api[fn]({
      driverInfoDTO,
      carInfoDTO
    }).then(res => {
      console.log('[ res ]-188', res);
      if (res.code == 200)

        message.success(`${isEdit.value ? '修改成功' : '新建成功'}`);
      resetForm()

      openAddModal.value = false

      getData()
    })


  })
    .catch(error => {
      console.log('error', error);
    });
};

const handleCancel = () => {
  resetForm()
}

const uploadImg = (name, file) => {
  console.log('fileList222 ', file);
  const formData = new FormData();
  formData.append('photo', file, file.name);
  console.log('[ formData ]-59', formData);
  return api.uploadImg(
    formData,
    {
      'Content-Type': 'multipart/form-data'
    })

};
const getImgUrl = (name, list = []) => {
  console.log('name, list: ', name, list);
  return list.find(item => item.name == name + '.png')['url']
}


const handleDel = (row) => {
  console.log('[ row ]-243', row);
  api.delCategory({ id: row.id }).then(res => {
    console.log('[ res ]-245', res);
    if (res.code == 200) {
      message.success(`删除成功`);
      getData()
    }
  })
}
const modifyData = (row) => {
  console.log('[ row ]-300', row);
  api.getDriver({ id: row.id }).then(res => {
    console.log('res: ', res);
    if (res.code == 200) {

      const { driverCarInfoRsp, driverInfoRsp } = res.data
      formState.value.name = driverInfoRsp.name
      formState.value.cellphone = driverInfoRsp.cellphone
      formState.value.idCard = driverInfoRsp.idCard
      formState.value.idCardBack = driverInfoRsp.idCardBack
      formState.value.idCardFront = driverInfoRsp.idCardFront
      formState.value.licencePhoto = driverInfoRsp.licencePhoto
      formState.value.netLicencePhoto = driverInfoRsp.netLicencePhoto

      formState.value.carBrand = driverCarInfoRsp.carBrand
      formState.value.carColor = driverCarInfoRsp.carColor
      formState.value.carModel = driverCarInfoRsp.carModel
      formState.value.plateNumber = driverCarInfoRsp.plateNumber
      formState.value.seats = driverCarInfoRsp.seats
      formState.value.driveLicensePhoto = driverCarInfoRsp.driveLicensePhoto
      formState.value.insurancePhoto = driverCarInfoRsp.insurancePhoto
      formState.value.roadPermitPhoto = driverCarInfoRsp.roadPermitPhoto
      formState.value.carId = driverCarInfoRsp.id

      idCardFrontFileList.value = [{ url: driverInfoRsp.idCardFront }]
      idCardBackFileList.value = [{ url: driverInfoRsp.idCardBack }]
      licencePhotoFileList.value = [{ url: driverInfoRsp.licencePhoto }]
      netLicencePhotoFileList.value = [{ url: driverInfoRsp.netLicencePhoto }]

      driveLicensePhotoFileList.value = [{ url: driverCarInfoRsp.driveLicensePhoto }]
      insurancePhotoFileList.value = [{ url: driverCarInfoRsp.insurancePhoto }]
      roadPermitPhotoFileList.value = [{ url: driverCarInfoRsp.roadPermitPhoto }]

    }

  })







  isEdit.value = true
  currentId.value = row.id
  openAddModal.value = true

  return


}




</script>

<style lang="scss" scoped>
.vertical-form-item {
  .ant-form-row {
    flex-direction: column;
  }
}

.map-wrap {
  margin: 20px 0;
}
</style>