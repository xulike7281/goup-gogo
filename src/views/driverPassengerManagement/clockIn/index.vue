<template>

  <a-card>
    <a-space class="row cen-space">
      <!-- <a-space-compact block>
                  <a-input :style="{ width: '200px' }"  placeholder="分类id"/>
                  <a-button type="primary">搜索</a-button>
              </a-space-compact> -->
      <div>
        <!-- <a-select v-model:value="walnutCategoryValue" allowClear placeholder="核桃品种"
          style="width: 200px;margin-right: 16px;" :options="walnutCategoryOptions"
          @change="handleWalnutCategory"></a-select>
        <a-select v-model:value="taskStatusValue" placeholder="运算状态" allowClear style="width: 200px"
          :options="taskStatusOptions" @change="handleTaskStatus"></a-select> -->
      </div>

      <a-button type="primary" @click="showModal">添加打卡区域</a-button>
    </a-space>
  </a-card>
  <br />
  <a-card>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'type'">
          <div>{{ record.type == 1 ? '场站' : '区域' }}</div>

        </template>
        <template v-if="column.key === 'action'">
          <a-button type="link" size="small" @click="modifyData(record)"> 编辑</a-button>
          <a-popconfirm title="是否删除" ok-text="是" cancel-text="否" @confirm="handleDel(record)">
            <a-button type="link" size="small"> 删除</a-button>
          </a-popconfirm>
        </template>
      </template>

    </a-table>
    <br>
    <!-- <a-pagination v-model:current="currentPage" :total="total" @change="getData"/> -->
    <a-space class="row cen-end">
      <a-pagination v-model:current="currentPage" v-model:page-size="pageSize" :total="total" showSizeChanger
        :show-total="total => `共有 ${total} 条数据`" @change="getData" />
    </a-space>

  </a-card>

  <a-modal v-model:open="openAddModal" width="70%" :title="isEdit ? '编辑围栏' : '运营区域围栏绘制'" okText="确定" cancelText="取消"
    @ok="handleOk" @cancel="handleCancel">
    <a-form ref="formRef" :model="formState" :rules="rules">

      <div class="map-wrap">
        <gp-map pagetype="1"></gp-map>
      </div>

      <a-form-item label="名称" name="name">
        <a-input v-model:value="formState.name" placeholder="名称" style="width: 200px;" />
      </a-form-item>
      <a-form-item label="所属城市" name="cityCodes" style="width: 400px;">
        <a-select v-model:value="formState.cityCodes" placeholder="选择城市" :options="cityOptions"
          style="width: 200px;"></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
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
  span: 6,
};
const wrapperCol = {
  span: 10,
};

const formState = reactive({
  type: '1',
  address: '',
  name: '',//
  cityCodes: undefined,// 
});

const cityOptions = [
  {
    value: '010',
    label: '北京',
  },
]

const rules = {
  name: [
    {
      required: true,
      message: '请填写名称',
      trigger: 'change',
    },
  ],
  cityCodes: [
    {
      required: true,
      message: '请选择城市',
      trigger: 'change',
    },
  ],
};
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '所在城市',
    dataIndex: 'cityName',
    key: 'cityName',
  },
  {
    title: '当前状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
  },
];
const getData = () => {
  api.getClockInAreaList({
    pageNum: currentPage.value,
    pageSize: pageSize.value
  }).then(res => {
    console.log('[ res ]-17', res);
    if (res.code == 200) {
      data.value = res.data.clockInAreaDTOList
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
})
const showModal = () => {
  formState.name = ''
  isEdit.value = false
  openAddModal.value = true;
};
const handleOk = e => {
  console.log('formState', formState);
  formRef.value.validate().then(() => {
    let fn = isEdit.value ? 'mdCategory' : 'addSite'
    let data = {
      ...formState,
      type: formState.type * 1,
      cityNames: '北京'
    }
    console.log('data: ', data);

    if (isEdit.value) {
      data.id = currentId.value
    }

    api[fn]({
      ...data
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
  margin-bottom: 20px;
}
</style>