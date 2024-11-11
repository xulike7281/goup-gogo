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

            <a-button type="primary" @click="showModal">添加线路</a-button>
        </a-space>
    </a-card>
    <br />
    <a-card>
        <a-table :columns="columns" :data-source="data" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-popconfirm title="是否下线线路" ok-text="是" cancel-text="否" @confirm="modifyData(record)">
                        <a-button type="link" size="small">下线</a-button>
                    </a-popconfirm>
                    <a-popconfirm title="是否恢复线路" ok-text="是" cancel-text="否" @confirm="handleDel(record)">
                        <a-button type="link" size="small"> 恢复</a-button>
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

    <a-modal v-model:open="openAddModal" width="620px" :title="isEdit ? '编辑运营线路' : '添加运营线路'" okText="确定" cancelText="取消"
        @ok="handleOk" @cancel="handleCancel">

        <a-form ref="formRef" :model="formState" :rules="rules">
            <a-form-item label="线路名称" name="lineName">
                <a-input v-model:value="formState.lineName" placeholder="线路名称" style="width: 200px;" />
            </a-form-item>
            <a-form-item label="出发地" name="startSiteName">
                <a-select v-model:value="formState.startSiteId" placeholder="选择出发地"
                    :options="siteOptions.map(item => ({ value: item.id, label: item.name }))"
                    style="width: 200px;"></a-select>
            </a-form-item>
            <a-form-item label="目的地" name="endSiteName">
                <a-select v-model:value="formState.endSiteId" placeholder="选择目的地"
                    :options="siteOptions.map(item => ({ value: item.id, label: item.name }))"
                    style="width: 200px;"></a-select>
            </a-form-item>
            <!-- <a-form-item label="产品类型" name="productType" style="width: 100%;">
                <a-radio-group v-model:value="formState.productType" :options="productTypeOptions" />
            </a-form-item> -->
            <a-card title="拼车">
                <a-form-item label="线下价格" name="offlinePrice">
                    <a-input-number v-model:value="formState.offlinePrice" placeholder="线下价格" :min="0">
                        <template #addonAfter>
                            元/人
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item label="线上价格" name="onlinePrice">
                    <a-input-number v-model:value="formState.onlinePrice" placeholder="线下价格" :min="0">
                        <template #addonAfter>
                            元/人
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item label="运营周期" name="p_period">
                    <a-range-picker v-model:value="formState.p_period" :format="['YYYY-MM-DD', 'YYYY-MM-DD']"
                        :placeholder="['开始日期', '结束日期']" />
                </a-form-item>
                <a-form-item label="运营时间" name="p_periodTime">
                    <a-time-range-picker v-model:value="formState.p_periodTime" :placeholder="['开始时间', '结束时间']"
                        format="HH:mm" :minuteStep="10" />
                </a-form-item>
                <a-form-item label="发车间隔时间" name="intervals">
                    <a-input-number id="inputNumber" v-model:value="formState.intervals" :min="0">
                        <template #addonAfter>
                            分钟
                        </template>
                    </a-input-number>
                </a-form-item>
            </a-card>
            <a-card title="包车" style="margin-top: 20px;">

                <!-- <a-form-item label="座位数" name="seats" style="width: 100%;">
                <a-radio-group v-model:value="formState.seats" :options="plainOptions" />
            </a-form-item> -->

                <a-form-item label="五座线下价格" name="seat5OfflinePrice">
                    <a-input-number v-model:value="formState.seat5OfflinePrice" :min="0" placeholder="五座线下价格">
                        <template #addonAfter>
                            元/车
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item label="五座线上价格" name="seat5OnlinePrice">
                    <a-input-number v-model:value="formState.seat5OnlinePrice" :min="0" placeholder="五座线上价格">
                        <template #addonAfter>
                            元/车
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item label="七座线下价格" name="seat7OfflinePrice">
                    <a-input-number v-model:value="formState.seat7OfflinePrice" :min="0" placeholder="七座线下价格">
                        <template #addonAfter>
                            元/车
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item label="七座线上价格" name="seat7OnlinePrice">
                    <a-input-number v-model:value="formState.seat7OnlinePrice" :min="0" placeholder="七座线上价格">
                        <template #addonAfter>
                            元/车
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item label="运营周期" name="b_period">
                    <a-range-picker v-model:value="formState.b_period" :format="['YYYY-MM-DD', 'YYYY-MM-DD']"
                        :placeholder="['开始日期', '结束日期']" />
                </a-form-item>
                <a-form-item label="运营时间" name="b_periodTime">
                    <a-time-range-picker v-model:value="formState.b_periodTime" :placeholder="['开始时间', '结束时间']"
                        format="HH:mm" :minuteStep="10" />
                </a-form-item>
            </a-card>

            <a-form-item label="" name="saleHoursLater" style="margin-top: 20px;">
                <div class="row cen-start" style="gap:5px">
                    仅卖 <a-input-number id="inputNumber" v-model:value="formState.saleHoursLater" :min="1" :max="10" />
                    小时以外的票
                </div>

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
import { min } from 'lodash-es';
const activeKey = ref('1');
const router = useRouter()
const plainOptions = [{ label: '5 座', value: 5 },
{ label: '7 座', value: 7 },];
const productTypeOptions = [{ label: '拼车', value: '1' },
{ label: '包车', value: '2' },];
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
const siteOptions = ref([])
const formState = reactive({
    lineName: '1-2',//线路名称
    startSiteId: 1,// 出发地id
    startSiteName: '1',// 出发地名称
    endSiteId: 2,// 目的地id
    endSiteName: '2',// 目的地

    intervals: 10, // 拼车间隔多久发车(单位:分钟) 
    offlinePrice: 20, // 拼车线下价格
    onlinePrice: 200, // 拼车线下价格
    p_period: [], // 拼车运营周期 
    p_periodTime: [], // 开始时间 - 结束时间

    seat5OfflinePrice: undefined, // 五座线下价格
    seat5OnlinePrice: undefined,// 五座线上价格
    seat7OfflinePrice: undefined, // 七座座线下价格
    seat7OnlinePrice: undefined,// 七座线上价格
    b_period: [], // 包车运营周期 
    b_periodTime: [], // 开始时间 - 结束时间

    saleHoursLater: 1, // 仅卖几小时后的票
});

const rules = {
    lineName: [
        {
            required: true,
            message: '请填写线路名称',
            trigger: 'change',
        },
    ],
    b_period: [
        {
            required: true,
            message: '请选择包车运营周期',
            trigger: 'change',
        },
    ],
    p_period: [
        {
            required: true,
            message: '请选择拼车运营周期',
            trigger: 'change',
        },
    ],
    b_periodTime: [
        {
            required: true,
            message: '请选择包车运营时间',
            trigger: 'change',
        },
    ],
    p_periodTime: [
        {
            required: true,
            message: '请选择拼车运营时间',
            trigger: 'change',
        },
    ],
    startSiteName: [
        {
            required: true,
            message: '请选择出发地',
            trigger: 'change',
        },
    ],
    endSiteName: [
        {
            required: true,
            message: '请选择目的地',
            trigger: 'change',
        },
    ],
    intervals: [
        {
            required: true,
            message: '请填写发车间隔时间',
            trigger: 'change',
        },
    ],


};
const columns = [
    {
        title: '线路编号',
        dataIndex: 'lineId',
        key: 'lineId',
    },
    {
        title: '线路名称',
        dataIndex: 'lineName',
        key: 'lineName',
    },
    {
        title: '出发地',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '目的地',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '拼车价格',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '发车周期',
        dataIndex: 'remark',
        key: 'remark',
    },
    {
        title: '发车时间',
        dataIndex: 'remark',
        key: 'remark',
    },
    {
        title: '到达时间',
        dataIndex: 'remark',
        key: 'remark',
    },
    {
        title: '包车价格',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '售几个小时以外的票',
        dataIndex: 'saleHoursLater',
        key: 'saleHoursLater',
    },
    {
        title: '操作',
        key: 'action',
    },
];
const getData = () => {
    api.getLineList({
        currentPage: currentPage.value,
        pageSize: pageSize.value
    }).then(res => {
        console.log('[ res ]-17', res);
        if (res.code == 200) {

            data.value = res.data.lineproductList
            total.value = res.data.total

        }
    })
}

const resetForm = () => {
    formState.name = ''
    formState.remark = ''
    formRef.value.resetFields();
};

onMounted(() => {
    getData()
    api.getSiteList({
        pageNum: 1,
        pageSize: 1000,
    }).then(res => {
        console.log('[ res ]-17', res);
        if (res.code == 200) {
            siteOptions.value = res.data.siteInfoList
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

    formRef.value.validate().then(() => {

        let fn = isEdit.value ? 'mdCategory' : 'addProductLine'
        const startSiteName = siteOptions.value.find(item => item.id == formState.startSiteId).name
        const endSiteName = siteOptions.value.find(item => item.id == formState.endSiteId).name
        let data = {
            saleHoursLater: 2,
            siteLineDTO: {
                name: formState.lineName,
                startSiteId: formState.startSiteId,
                startSiteName,
                endSiteId: formState.endSiteId,
                endSiteName,

            },

            carPoolAloneDTO: {
                periodStart: formState.b_period[0].format('YYYY-MM-DD'),
                periodEnd: formState.b_period[1].format('YYYY-MM-DD'),
                seat5OfflinePrice: formState.seat5OfflinePrice,
                seat5OnlinePrice: formState.seat5OnlinePrice,
                seat7OfflinePrice: formState.seat7OfflinePrice,
                seat7OnlinePrice: formState.seat7OnlinePrice,
                // timeStart: formState.b_periodTime[0].format('HH:mm'),
                // timeEnd: formState.b_periodTime[1].format('HH:mm')
                timeStart: 10,
                timeEnd: 20
            },

            carPoolDTO: {
                intervals: formState.intervals,
                offlinePrice: formState.offlinePrice,
                onlinePrice: formState.onlinePrice,
                periodStart: formState.p_period[0].format('YYYY-MM-DD'),
                periodEnd: formState.p_period[1].format('YYYY-MM-DD'),
                // timeStart: formState.p_periodTime[0].format('HH:mm'),
                // timeEnd: formState.p_periodTime[1].format('HH:mm')
                timeStart: 10,
                timeEnd: 20
            },


        }
        if (isEdit.value) {
            data.id = currentId.value
        }

        console.log('data: ', data);
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