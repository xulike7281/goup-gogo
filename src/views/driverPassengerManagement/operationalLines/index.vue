<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="运营区域">
      <operatingArea></operatingArea>
    </a-tab-pane>
    <a-tab-pane key="2" tab="运营线路和价格设置" force-render>
      <linePrice></linePrice>
    </a-tab-pane>
  </a-tabs>

</template>

<script setup>
import operatingArea from './components/operatingArea.vue'
import linePrice from './components/linePrice.vue'
import gpMap from '@/components/gpMap/index.vue'
import { onMounted, ref, reactive, toRaw } from 'vue';
import * as api from '@/common/index'
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
const activeKey = ref('1');
const router = useRouter()
const env = import.meta.env
const openAddModal = ref(false);
const data = ref([])
const isEdit = ref(false)
const formRef = ref(null);
const currentId = ref('')
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const labelCol = {
  span: 4,
};
const wrapperCol = {
  span: 24,
};

const formState = reactive({
  name: '',// 算法名称
  remark: '',// 算法配置
});

const rules = {
  name: [
    {
      required: true,
      message: '请前填写品种名称',
      trigger: 'change',
    },
  ],
  remark: [
    {
      required: false
    },
  ],
};
const columns = [
  {
    title: '品种名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '操作',
    key: 'action',
  },
];
const getData = () => {
  // api.getOrder({}).then(res => {
  //   console.log('res: ', res);

  // })
  return
  api.getCategoryList({
    pageNum: currentPage.value,
    pageSize: pageSize.value
  }).then(res => {
    console.log('[ res ]-17', res);
    if (res.code == "0") {

      data.value = res.data.list
      total.value = res.data.total

    }
  })
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
  return
  api.getCommonOptions({
    typeCode: 'category_task_status',
  }).then(res => {
    if (res.code == "0") {

      // data.value = res.data.list
      console.log('[ total.value ]-152', total.value);
    }
  })

})
const showModal = () => {
  formState.name = ''
  formState.remark = ''
  isEdit.value = false
  openAddModal.value = true;
};
const handleOk = e => {
  console.log(e);

  formRef.value.validate().then(() => {

    let fn = isEdit.value ? 'mdCategory' : 'addCategory'
    let data = {
      name: formState.name,
      remark: formState.remark
    }
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
  api.delCategory({ id: row.id }).then(res => {
    console.log('[ res ]-245', res);
    if (res.code == '0') {
      message.success(`删除成功`);
      getData()
    }
  })
}
const modifyData = (row) => {
  console.log('[ row ]-300', row);
  formState.name = row.name
  formState.remark = row.remark
  isEdit.value = true
  currentId.value = row.id
  openAddModal.value = true

  return


}




</script>

<style lang="scss" scoped>
.map-wrap {
  margin: 20px 0;
}
</style>