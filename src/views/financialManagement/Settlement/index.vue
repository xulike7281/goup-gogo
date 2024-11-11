<template>

  <a-card>
    <a-space class="row cen-space">
      <a-form :model="formState" class="row" style="gap: 20px;" name="horizontal_login" layout="inline"
        autocomplete="off" @finish="getData">
        <a-form-item label="司机编号" name="username">
          <a-input v-model:value="formState.name" placeholder="司机编号" />
        </a-form-item>
        <a-form-item label="司机姓名" name="password">
          <a-input v-model:value="formState.name" placeholder="姓名" />
        </a-form-item>
        <a-form-item label="司机手机号" name="password">
          <a-input v-model:value="formState.name" placeholder="发票抬头" />
        </a-form-item>


        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="showModal">新建算法</a-button>
    </a-space>
  </a-card>
  <br />
  <a-card>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'action'">
          <a-button type="link" size="small" @click="modifyData(record)"> 修改</a-button>
          <a-popconfirm title="是否删除" ok-text="是" cancel-text="否" @confirm="handleDel(record)">
            <a-button type="link" size="small"> 删除</a-button>
          </a-popconfirm>
        </template>
      </template>

    </a-table>
  </a-card>

  <a-modal v-model:open="openAddModal" :width="640" :title="isEdit ? '编辑算法' : '新建算法'" okText="确定" cancelText="取消"
    @ok="handleOk" @cancel="handleCancel">

    <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="配置名" name="name">
        <a-input v-model:value="formState.name" placeholder="配置名" style="width: 50%;" />
      </a-form-item>
      <a-row>
        <a-col :span='3' style="text-align: center;"><span style="font-weight: 600;">误差属性</span></a-col>
        <a-col :span='12'></a-col>
        <a-col :span='4' style="text-align: center;"><span style="font-weight: 600;">权重(0-30)</span></a-col>
        <a-col :span='4' style="text-align: center;"><span style="font-weight: 600;">误差(0-1)</span></a-col>

      </a-row>
      <br>
      <a-form-item label="肚尺寸" name="" style="width: 100%;">
        <a-row class="w100" justify="space-between" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.size" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.size" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.size" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="边尺寸" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.width" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.width" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.width" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="高尺寸" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.height" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.height" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.height" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="顶轮廓" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.topContour" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.topContour" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.topContour" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="面轮廓" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.widthContour" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.widthContour" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.widthContour" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="肚轮廓" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.sizeContour" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.sizeContour" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.sizeContour" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="底轮廓" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.bottomContour" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.bottomContour" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.bottomContour" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="纹理" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.texture" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.texture" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.texture" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="重量" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.weight" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.weight" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.weight" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="色差" name="" style="width: 100%;">
        <a-row class="w100" :gutter="16">
          <a-col :span="14">
            <a-slider v-model:value="formState.ruleWeight.colorDiff" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleWeight.colorDiff" :min="0" :max="30" />
          </a-col>
          <a-col :span="5">
            <a-input-number v-model:value="formState.ruleError.colorDiff" :min="0" :max="1" step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { onMounted, ref, reactive, toRaw } from 'vue';
import * as api from '@/common/index'
import { getToken } from '@/common/auth'
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const env = import.meta.env
const openAddModal = ref(false);
const data = ref([])
const isEdit = ref(false)
const formRef = ref(null);
const currentId = ref('')
const ruleName = ref(undefined)
const labelCol = {
  span: 3,
};
const wrapperCol = {
  span: 21,
};

const formState = ref({
  name: '',// 算法名称
  rule: {
    "weight": { "error": 0.1, "weight": 1.0 },
    "texture": { "error": 0.1, "weight": 1.0 },
    "sizeEdge": { "error": 0.1, "weight": 1.0 },
    "sizeBelly": { "error": 0.1, "weight": 1.0 },
    "contourTop": { "error": 0.1, "weight": 1.0 },
    "sizeHeight": { "error": 0.1, "weight": 1.0 },
    "contourFace": { "error": 0.1, "weight": 1.0 },
    "contourBelly": { "error": 0.1, "weight": 1.0 },
    "contourBottom": { "error": 0.1, "weight": 1.0 },
    "colorDifference": { "error": 0.1, "weight": 1.0 }
  },// 算法配置
});


const rules = {
  name: [
    {
      required: true,
      message: '请前填写算法名称',
      trigger: 'change',
    },
  ],
  info: [
    {
      required: true,
      message: '请前填写算法配置',
      trigger: 'change',
    },
  ],
};
const columns = [
  {
    title: '司机编号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '司机姓名',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '司机手机号',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '总收入',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '账号余额',
    dataIndex: 'createTime',
    key: 'createTime',
  },

  {
    title: '操作',
    key: 'action',
  },
];


const resetForm = () => {

  formState.value.name = ''
  formState.value.rule = {
    "weight": { "error": 0.1, "weight": 1.0 },
    "texture": { "error": 0.1, "weight": 1.0 },
    "sizeEdge": { "error": 0.1, "weight": 1.0 },
    "sizeBelly": { "error": 0.1, "weight": 1.0 },
    "contourTop": { "error": 0.1, "weight": 1.0 },
    "sizeHeight": { "error": 0.1, "weight": 1.0 },
    "contourFace": { "error": 0.1, "weight": 1.0 },
    "contourBelly": { "error": 0.1, "weight": 1.0 },
    "contourBottom": { "error": 0.1, "weight": 1.0 },
    "colorDifference": { "error": 0.1, "weight": 1.0 }
  }
  formRef.value.resetFields();
};
const getData = () => {
  api.getInvoiceList({
    pageNum: 1,
    pageSize: 20,
    name: ruleName.value
  }).then(res => {
    if (res.code == 200) {
      data.value = res.data.list
    } else {
      message.error('请求失败');

    }
  })
}
onMounted(() => {
  getData()


})
const showModal = () => {
  isEdit.value = false
  openAddModal.value = true;
};






const handleOk = e => {
  console.log(e);
  console.log('[ e ]-382', formState);

  formRef.value.validate().then(() => {
    const data = JSON.parse(JSON.stringify(formState.value))
    console.log('[ data ]-386', data);
    let fn = isEdit.value ? 'mdAlgorithm' : 'addAlgorithm'

    if (isEdit.value) {
      data.id = currentId.value
    }

    api[fn]({
      ...data
    }).then(res => {
      console.log('[ res ]-188', res);
      if (res.code == '0')

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




const handleDel = (row) => {
  console.log('[ row ]-243', row);
  api.delAlgorithm({ id: row.id }).then(res => {
    console.log('[ res ]-245', res);
    if (res.code == '0') {
      message.success(`删除成功`);
      getData()
    } else {
      message.error(`删除失败`);

    }
  })
}
const modifyData = (row) => {
  console.log('[ row ]-300', row);
  isEdit.value = true
  currentId.value = row.id
  formState.value.name = row.name
  formState.value.ruleError = row.ruleError
  formState.value.ruleWeight = row.ruleWeight

  openAddModal.value = true
  return


}




</script>

<style lang="scss" scoped></style>