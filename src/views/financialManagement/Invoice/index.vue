<template>

  <a-card>
    <a-space class="row cen-space">
      <a-form :model="formState" class="row" style="gap: 20px;" name="horizontal_login" layout="inline"
        autocomplete="off" @finish="getData">
        <a-form-item label="发票状态" name="username">
          <a-input v-model:value="formState.name" placeholder="司机编号" />
        </a-form-item>
        <a-form-item label="姓名" name="password">
          <a-input v-model:value="formState.name" placeholder="姓名" />
        </a-form-item>
        <a-form-item label="发票抬头" name="password">
          <a-input v-model:value="formState.name" placeholder="发票抬头" />
        </a-form-item>
        <a-form-item label="发票金额" name="password">
          <a-input v-model:value="formState.name" placeholder="发票金额" />
        </a-form-item>
        <a-form-item label="邮箱地址" name="password">
          <a-input v-model:value="formState.name" placeholder="邮箱地址" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="showModal">新建品种</a-button>
    </a-space>
  </a-card>
  <br />
  <a-card>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="link" size="small" @click="modifyData(record)"> 修改</a-button>
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

  <a-modal v-model:open="openAddModal" :title="isEdit ? '编辑品种' : '新建品种'" okText="确定" cancelText="取消" @ok="handleOk"
    @cancel="handleCancel">
    <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="品种" name="name">
        <a-input v-model:value="formState.name" placeholder="品种" />
      </a-form-item>
      <a-form-item label="备注" name="remark" style="width: 100%;">
        <a-textarea v-model:value="formState.remark" :rows="2" :style="{ width: '100%' }" placeholder="备注"
          :maxlength="60" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import iconImg from '../../../imgs/icon.png'
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
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const labelCol = {
  span: 5,
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
    title: '发票抬头',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '发票金额',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '订单号',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '提交开票时间',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '邮箱地址',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '开票时间',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '操作人',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '操作',
    key: 'action',
  },
];
const getData = () => {
  api.getInvoiceList({
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

<style lang="scss" scoped></style>