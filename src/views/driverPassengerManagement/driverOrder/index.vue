<template>
  <a-card>
    <a-space class="row cen-space">
      <a-form :model="formState" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item label="订单号" name="username">
          <a-input v-model:value="formState.name" placeholder="订单号" />
        </a-form-item>
        <a-form-item label="服务司机" name="password">
          <a-input v-model:value="formState.name" placeholder="服务司机" />
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit">搜索</a-button>
        </a-form-item>
      </a-form>

      <!-- <a-button type="primary" @click="showModal">新建算法</a-button> -->
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
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '订单号',
    dataIndex: 'driverOrderId',
    key: 'driverOrderId',
  },
  {
    title: '订单类型',
    dataIndex: 'buyType',
    key: 'buyType',
  },
  {
    title: '来源渠道',
    dataIndex: 'poolType',
    key: 'poolType',
  },
  {
    title: '服务状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '服务司机',
    dataIndex: 'driverName',
    key: 'driverName',
  },

  // {
  //   title: '操作',
  //   key: 'action',
  // },
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
  api.getDriverOrderList({
    pageNum: 1,
    pageSize: 20,
    name: ruleName.value
  }).then(res => {
    if (res.code == 200) {
      data.value = res.data
    } else {
      message.error('请求失败');

    }
  })
}
onMounted(() => {
  getData()
  // api.getCommonOptions({
  //   typeCode: 'category_task_status',
  // }).then(res => {
  //   console.log('[ res ]-17', res);
  //   if (res.code == "0") {

  //     data.value = res.data.list
  //   }
  // })

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