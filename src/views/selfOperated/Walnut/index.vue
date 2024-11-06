<template>

    <a-card>
        <!-- <a-form layout="inline" :model="formState" v-bind="formItemLayout" :labelCol="{ span: 6, offset: 0 }" style="width: 100%;">
            <a-form-item label="Field A :">
                <a-input v-model:value="formState.fieldA" placeholder="input placeholder" />
            </a-form-item>
            <a-form-item label="Field B :">
                <a-input v-model:value="formState.fieldB" placeholder="input placeholder" />
            </a-form-item>
            <a-form-item label="Field B :"  :labelCol="{ span: 8, offset: 0 }" > 
                <a-select v-model:value="value" placeholder="custom dropdown render" style="width: 140px;"
                    :options="items.map(item => ({ value: item }))">
                    <template #dropdownRender="{ menuNode: menu }">
                        <v-nodes :vnodes="menu" />
                        <a-divider style="margin: 4px 0" />
                        <a-space style="padding: 4px 8px">
                            <a-input ref="inputRef" v-model:value="name" placeholder="Please enter item" />
                            <a-button type="text" @click="addItem">
                                <template #icon>
                                    <plus-outlined />
                                </template>
                            </a-button>
                        </a-space>
                    </template>
                </a-select>
            </a-form-item>

            <a-form-item :wrapper-col="{
                span: 14,
                offset: 14,
            }">
                <a-button type="primary">Submit</a-button>
            </a-form-item>
        </a-form> -->
        <a-space>
            <a-space-compact block>
                <a-input :style="{ width: '200px' }" v-model:value="drawerNumber"  placeholder="核桃抽屉号2"/>
                <a-button type="primary" @click="getData">搜索</a-button>
            </a-space-compact>
        </a-space>
    </a-card>
    <br />
    <a-card >
        <a-table :columns="columns" :data-source="tableData">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>
                        {{ record.name }}
                    </a>
                </template>
                <template v-else-if="column.key === 'tags'">
                    <span>
                        <a-tag v-for="tag in record.tags" :key="tag"
                            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                        <a-button type="link
                        "> 操作</a-button>
                </template>
            </template>
        </a-table>
    </a-card>

</template>
<script setup>

import * as api from '@/common/index'

import { computed, reactive,ref,defineComponent } from 'vue';
const formState = reactive({
    layout: 'horizontal',
    fieldA: '',
    fieldB: '',
});

const tableData = ref([]);

const drawerNumber = ref(undefined)


const columns = [
    {   
        title:'母核桃ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '核桃抽屉号',
        dataIndex: 'drawerNumber',
        key: 'drawerNumber',
    },
    {
        title: '录入时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '子成功配对',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: '相似度',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: '操作',
        key: 'action',
    },
];

const getData = ()=>{
    console.log('[ drawerNumber.value ]-129', drawerNumber.value);
    api.searchWalnut({
        drawerNumber:drawerNumber.value,
        pageSize:20,
        pageNum:1
    }).then(res=>{
        if(res.code == '0'){

            tableData.value = res.data.list
            console.log('[ tableData.value ]-127', tableData.value);
        }
    })
}
</script>