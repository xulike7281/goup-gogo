<template>
  <a-card>
    <a-space class="row cen-space">
      <div>
        <a-select v-model:value="categoryValue" allowClear placeholder="核桃品种"
          style="width: 200px;margin-right: 16px;" :options="categoryOptions.map(item=>({value:item.id,label:item.name}))"
          @change="getData"></a-select>
        <a-select v-model:value="taskStatusValue" allowClear placeholder="运算状态"   style="width: 200px;margin-right: 16px;"
          :options="taskStatusOptions.map(item=>({value:item.value,label:item.name}))" @change="getData" ></a-select>
   
        <a-select v-model:value="customerId" allowClear placeholder="选择客户信息"  style="width: 200px;margin-right: 16px;" 
        :options="customerOptions.map(item=>({value:item.id,label:item.name}))" @change="getData" ></a-select>

        <a-select v-model:value="batchStatus" allowClear placeholder="选择上架状态"  style="width: 200px;margin-right: 16px;" 
        :options="batchStatusOptions" @change="getData" ></a-select>
      </div>

      <a-button type="primary" @click="showModal">新建批次</a-button>
    </a-space>
  </a-card>
  <br />
  <a-card>
    <a-table :columns="columns" :data-source="tableData">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'categoryName'">
          <span>
            核桃品种
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'categoryName'">
          <div class="row cen-start" @click="toDetail(record)">
            <img class="mr16" style="width: 48px;" :src="iconImg" alt="">
            <div class="column">
              <a style="color: #4C515E;font-weight: bold;" >
                {{ record.categoryName }}
              </a>
              <span class="ft12" style="color: #B2B8C7;">
                最后录入:{{ record.updateTime }}
              </span>
            </div>
          </div>
        </template>
        <template v-if="column.key === 'customerId'">
          {{customerOptions.find((item=>item.id == record.customerId )).name}}
        </template>
        <template v-if="column.key === 'action'">
          <a-button type="link" size="small" @click="mdBatch(record)"> 修改</a-button>
          <a-popconfirm :title="`是否${!record.status?'上架':'下架'}批次`" ok-text="是" cancel-text="否" @confirm="mdBatchStatus(record)">
            <a-button type="link" size="small" > {{ !record.status?'上架':'下架' }}</a-button>
          </a-popconfirm>
          <a-button type="link" size="small" @click="toPair(record)"> 详情</a-button>
          <a-button type="link" size="small" :disabled="!record.status" >{{ taskStatusMap[record.taskStatus] }} </a-button>
        </template>
      </template>

    </a-table>
  </a-card>


  <a-modal v-model:open="openCategoryInfo" :title="isEdit?'修改批次':'新建批次'" @ok="onSubmit" @cancel="handleCancel" :okText="isEdit?'修改':'新建'" cancelText="取消">
    <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="客户信息" name="customerId">
        <a-select v-model:value="formState.customerId" placeholder="选择客户信息" :options="customerOptions.map(item=>({value:item.id,label:item.name}))" >
        </a-select>
      </a-form-item>
      <a-form-item label="核桃品种" name="categoryId">
        <a-select v-model:value="formState.categoryId" :options="categoryOptions.map(item => ({ value: item.id ,label:item.name}))" placeholder="选择核桃品种">
        </a-select>
      </a-form-item>
      <a-form-item label="算法配置" name="algorithmId">
        <a-select v-model:value="formState.algorithmId" :options="algorithmOptions.map(item => ({ value: item.id ,label:item.name}))" placeholder="选择算法配置">
        </a-select>
      </a-form-item>
      <a-form-item ref="x" label="横轴数" name="x">
        <a-input v-model:value="formState.x" />
      </a-form-item>
      <a-form-item ref="y" label="纵轴数" name="y">
        <a-input v-model:value="formState.y" />
      </a-form-item>
      <a-form-item ref="remark" label="备注" name="remark">
        <a-input v-model:value="formState.remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import iconImg from '../../../imgs/icon.png'
import { onMounted, ref, reactive, toRaw, defineComponent } from 'vue';
import * as api from '@/common/index'

import { message } from 'ant-design-vue';

import { useRoute, useRouter } from 'vue-router';
import { PlusOutlined, } from '@ant-design/icons-vue';


// taskStatus（0：启动运算：1：运算中；2：运算完成；3：运算异常；4：重新运算）

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});
const router = useRouter()
const route = useRoute()
const isEdit = ref(false)

let uploadCount = 0
const openCategoryInfo = ref(false);

const fileList = ref([]);

const algorithmOptions =  ref([])
const categoryOptions =  ref([])
const taskStatusOptions =  ref([])
const customerOptions =  ref([])
const customerName = ref(undefined)
// （0：下架；1：上架）
// task_status（0：启动运算：1：运算中；2：运算完成；3：运算异常；4：重新运算）
const categoryValue = ref(undefined)
const taskStatusValue = ref(undefined)
const batchStatus = ref('1')
const customerId = ref(16)
const tableData = ref([])
const currentId = ref(undefined)
const taskStatusMap = {
  0: "启动运算",
  1: '运算中',
  2: '运算完成',
  3: '运算异常',
  4: '重新运算'
}
const batchStatusOptions=[
  {
    value:'0',
    label:'下架'
  },
  {
    value:'1',
    label:'上架'
  }

]


const formRef = ref();
const labelCol = {
  span: 5,
};
const wrapperCol = {
  span: 13,
};

const formState = reactive({
  customerId: 16 ,// 客户信息
  categoryId: undefined ,// 分类Id
  algorithmId: undefined ,// 算法配置
  x: 5, // 抽屉X轴数量
  y: 6, // 抽屉Y轴数量
  remark: '', // 备注
});

const rules = {

  customerId: [
    {
      required: true,
      message: '请选择客户信息',
      trigger: 'change',
    },
  ],
  categoryId: [
    {
      required: true,
      message: '请选择核桃分类',
      trigger: 'change',
    },
  ],
  algorithmId: [
    {
      required: true,
      message: '请选择算法配置',
      trigger: 'change',
    },
  ],
  x: [
    {
      required: true,
      message: '请填写X轴数量',
      trigger: 'change',
    },
  ],
  y: [
    {
      required: true,
      message: '请填写Y轴数量',
      trigger: 'change',
    },
  ],
  remark: [
    {
      required: true,
      message: '请填写备注',
      trigger: 'change',
    },
  ],

};


const columns = [
  {
    name: '核桃品种',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: '录入数量',
    dataIndex: 'total',
    key: 'age',
  },
  {
    title: '配对数量',
    dataIndex: 'totalMatch',
    key: 'totalMatch',
  },
  {
    title: '配对进度',
    key: 'completionRate',
    dataIndex: 'completionRate',
  },
  {
    title: '算法配置',
    key: 'algorithmName',
    dataIndex: 'algorithmName',
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',

  },
  {
    title: '客户信息',
    key: 'customerId',
    dataIndex: 'customerId'
  },
  {
    title: '操作',
    key: 'action',
  },

];


const getData = () => {
  api.getBatchList({
    categoryId:categoryValue.value,
    customerId:customerId.value,
    taskStatus:taskStatusValue.value,
    status:batchStatus.value,
    pageNum: 1,
    pageSize: 20
  }).then(res => {
    console.log('[ res ]-17', res);
    if (res.code == "0") {
      tableData.value = res.data.list
    }
  })

 

}

const getCommonData = ()=>{
  api.getCommonList({
    typeCode: 'batch_task_status',
  }).then(res => {
    console.log('[ res ]-319', res);
    if (res.code == "0") {
      taskStatusOptions.value = res.data.list.filter(item=>item.id != 10)
  
    }
  })
  api.getAlgorithm({
    pageNum: 1,
    pageSize: 200
  }).then(res => {

    if (res.code == "0") {

      algorithmOptions.value = res.data.list
    }
  })
  api.getCategoryList({
    pageNum: 1,
    pageSize: 200
  }).then(res => {

    if (res.code == "0") {
      categoryOptions.value = res.data.list
    }
  })
  api.getCommonList({
    typeCode: 'customer_info',
    pageNum: 1,
    pageSize: 200
  }).then(res => {
    if (res.code == "0") {
      customerOptions.value = res.data.list
    }
  })

}




const toDetail = (row) => {
  console.log('[ row ]-288', row);
  router.push({
    path: '/batch/detail',
    query: {
      batchId: row.id
    }
  })
}



const showModal = () => {
  isEdit.value = false
  openCategoryInfo.value = true;
 
};


const mdBatch = (row) => {
  isEdit.value = true
  formState.algorithmId = row.algorithmId
  formState.categoryId  = row.categoryId
  formState.customerId = row.customerId
  formState.x = row.x
  formState.y = row.y
  formState.remark = row.remark
  currentId.value = row.id
  openCategoryInfo.value = true

}
const toPair = (row)=>{
  console.log('[ row ]-359', row.id);
  router.push({
    path:'/batch/detail',
    query:{
      batchId:row.id
    }
  })
}

const mdBatchStatus = (row)=>{
  console.log('[ row ]-370', row);
  api.mdBatchStatus({
    id:row.id,
    status:row.status == 1?0:1
  }).then(res=>{
    row.status = Number(!row.status)
    message.success(`${row.status==1?'上架':'下架'}成功`);
  })
}
const handleCancel = ()=>{

  resetForm()
}

const onSubmit = () => {

  formRef.value.validate().then(() => {
    let fn = isEdit.value?'mdBatch':'addBatch'
    let data =  toRaw(formState)
    console.log('[ data ]-408', data);
    if(isEdit.value){
      data.id = currentId.value
    }
   
      api[fn]({
      ...data
    }).then(res=>{
      console.log('[ res ]-188', res);
      if(res.code == '0')

      message.success(`${isEdit.value?'修改成功':'新建成功'}`);
      resetForm()

      openCategoryInfo.value = false;

      getData()
    })
    })
    .catch(error => {
      console.log('error', error);
    });
};
const resetForm = () => {

  formRef.value.resetFields();
  formState.algorithmId = undefined
  formState.categoryId  = undefined
  formState.customerId = 16
  formState.x = 5
  formState.y = 6
  formState.remark = ''
};
onMounted(() => {
  getData()
  getCommonData()
})
</script>

<style lang="scss" scoped></style>