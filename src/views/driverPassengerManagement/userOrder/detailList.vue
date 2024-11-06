<template>

  <a-card>
    <a-space class="row cen-space">
      <a-space>
        <a-space-compact block>
          <a-input :style="{ width: '200px' }" v-model:value="ruleName" placeholder="规则参数名称" />
          <a-button type="primary" @click="getData">搜索</a-button>
        </a-space-compact>
        <a-select v-model:value="algorithmId" allowClear style="min-width: 200px"  
        :options="algorithmOptions.map(item => ({ value: item.id ,label:item.name}))" @change="getData" placeholder="选择算法配置">
        </a-select>
      </a-space>
      <a-space>
      <a-button type="primary" @click="createRule">新建规则</a-button>
    </a-space>
    </a-space>

  </a-card>
  <br />
  <a-card>
    <a-table :columns="columns" :data-source="tableData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="link" size="small" @click="modify(record)"> 修改</a-button>
          <a-button type="link" size="small" @click="modify(record)"> 删除</a-button>
        </template>
      </template>
    </a-table>
  </a-card>

  <a-modal v-model:open="openModal" :title="isEdit?'修改规则参数':'新建规则参数'" @ok="onSubmit" @cancel="handleCancel" :okText="isEdit?'修改':'新建'" cancelText="取消">
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
import { onMounted, ref, reactive, toRaw } from 'vue';
import * as api from '@/common/index'
import { message } from 'ant-design-vue';
import { taskStatusConfig, walnutCategoryConfig } from '@/config/index'
import { useRoute, useRouter } from 'vue-router';


const router = useRouter()
const route = useRoute()
const algorithmOptions =  ref([])

const drawerNumber =  ref(undefined)
const algorithmId =  ref(undefined)
const ruleName = ref('')




const tableData = ref([])

const openModal = ref(false)





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



const getData = ()=>{
  console.log('[ name.value ]-155', name.value);
  api.getRuleList({
    pageNum: 1,
    pageSize: 50,
    name:ruleName.value,
  }).then(res => {
    console.log('[ res ]-2222', res);
    if (res.code == "0") {
      tableData.value = res.data.list
    }
  })
}

onMounted(() => {
  getData()

  api.getAlgorithm({
    pageNum: 1,
    pageSize: 200
  }).then(res => {

    if (res.code == "0") {

      algorithmOptions.value = res.data.list
    }
  })
})


const columns = [
  {
    title: '算法参数名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },


  {
    title: '操作',
    key: 'action',
  },
];




const handleAlgorithm = (val)=>{
  console.log('[ val ]-129', val);

}



const createRule = () => {
  openModal.value = true
};

const handleDel = (row) => {
  console.log('[ row ]-243', row);
  api.delCategory({ id: row.id }).then(res => {
    console.log('[ res ]-245', res);
    if (res.code == '0') {
      message.success(`删除成功`);
    }
  })
}
const modify = (row) => {
  console.log('[ row ]-300', row);

  router.push({
    path:'/walnut/detail',
    query:{
      id:row.id
    }
  })
}







</script>

<style lang="scss" scoped></style>