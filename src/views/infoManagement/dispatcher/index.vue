<template>

  <a-card>
    <a-space class="row cen-space">
      <a-space-compact block>
        <a-input :style="{ width: '200px' }" placeholder="姓名" />
        <a-button type="primary">搜索</a-button>
      </a-space-compact>

      <div>
        <!-- <a-select v-model:value="walnutCategoryValue" allowClear placeholder="核桃品种"
          style="width: 200px;margin-right: 16px;" :options="walnutCategoryOptions"
          @change="handleWalnutCategory"></a-select>
        <a-select v-model:value="taskStatusValue" placeholder="运算状态" allowClear style="width: 200px"
          :options="taskStatusOptions" @change="handleTaskStatus"></a-select> -->
      </div>

      <a-button type="primary" @click="showModal">添加司机</a-button>
    </a-space>
  </a-card>
  <br />
  <a-card>
    <a-table :columns="columns" :data-source="tableData" :pagination="false">
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

  <a-modal v-model:open="openAddModal" :width="960" :title="isEdit ? '编辑司机' : '添加司机'" okText="确定" cancelText="取消"
    @ok="handleOk" @cancel="handleCancel">


    <a-form style="gap: 20px" ref="formRef" labelAlign="right" autocomplete="off" :model="formState" :rules="rules"
      :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="12">
          <a-form-item label="姓名" name="name">
            <a-input v-model:value="formState.name" placeholder="姓名" />
          </a-form-item>
          <a-form-item label="手机号" name="name">
            <a-input v-model:value="formState.name" placeholder="手机号" />
          </a-form-item>
          <a-form-item label="身份证号" name="name">
            <a-input v-model:value="formState.name" placeholder="身份证号" />
          </a-form-item>
          <a-form-item label="身份证正面" name="name" class="vertical-form-item">
            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture">
              <a-button>
                <upload-outlined></upload-outlined>
                upload
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="身份证反面" name="name" class="vertical-form-item">
            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture">
              <a-button>
                <upload-outlined></upload-outlined>
                upload
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="驾驶证" name="name" class="vertical-form-item">
            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture">
              <a-button>
                <upload-outlined></upload-outlined>
                upload
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="网约车资格证" name="name" class="vertical-form-item">
            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture">
              <a-button>
                <upload-outlined></upload-outlined>
                upload
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="车牌号" name="name">
            <a-input v-model:value="formState.name" placeholder="手机号" />
          </a-form-item>
          <a-form-item label="车辆品牌" name="name">
            <a-input v-model:value="formState.name" placeholder="手机号" />
          </a-form-item>
          <a-form-item label="车型" name="name">
            <a-input v-model:value="formState.name" placeholder="手机号" />
          </a-form-item>
          <a-form-item label="颜色" name="name">
            <a-input v-model:value="formState.name" placeholder="手机号" />
          </a-form-item>
          <a-form-item label="准乘人数" name="name">
            <a-input v-model:value="formState.name" placeholder="手机号" />
          </a-form-item>
          <a-form-item label="行驶本" name="name" class="vertical-form-item">
            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture">
              <a-button>
                <upload-outlined></upload-outlined>
                upload
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="保险单" name="name" class="vertical-form-item">
            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture">
              <a-button>
                <upload-outlined></upload-outlined>
                upload
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item label="网约车运输证" name="name" class="vertical-form-item">
            <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture">
              <a-button>
                <upload-outlined></upload-outlined>
                upload
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>
  </a-modal>
</template>

<script setup>
import gpMap from '@/components/gpMap/index.vue'
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
const getData = () => {
  api.getDriverList({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    driverCellphone: '',
    supplierCode: 'first'
  }).then(res => {
    console.log('[ res ]-17', res);
    if (res.code == 200) {

      tableData.value = res.data
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