<template>
  <div class="page">
    <div class="gva-card-box">
      <div class="gva-card gva-top-card">
        <div class="gva-top-card-left">
          <div class="gva-top-card-left-title">欢迎使用GOGO运营商服务系统</div>
        </div>
        <img src="../imgs/dashboard.png" class="gva-top-card-right" alt>

      </div>
    </div>
    <div class="gva-card-box">
      <a-card class="gva-card quick-entrance" title="快捷入口">

        <a-row :gutter="20">
          <a-col v-for="(card, key) in toolCards" :key="key" class="quick-entrance-items" @click="toTarget(card.path)">
            <div class="quick-entrance-item">
              <div class="quick-entrance-item-icon" :style="{ backgroundColor: card.bg }">
                <!-- <a-icon>
                  <component :is="card.icon" :style="{ color: card.color }" />
                </a-icon> -->
                <AppstoreOutlined style="font-size: 40px;" />
              </div>
              <p>{{ card.label }}</p>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>

  </div>
</template>

<script setup>
// import EchartsLine from '../views/dashboard/dashboardCharts/echartsLine.vue'
// import DashboardTable from '../views/dashboard/dashboardTable/dashboardTable.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  AppstoreOutlined,
  AppstoreTwoTone,
  AppstoreFilled
} from '@ant-design/icons-vue';


const router = useRouter()

const toolCards = ref([
  {
    label: '核桃管理', //艺人管理
    path: '/selfOperated/walnut',
    color: '#ff9c6e',
    bg: 'rgba(255, 156, 110,.3)'
  },
  {
    label: '批次管理', //专辑管理
    path: '/selfOperated/batch',
    color: '#69c0ff',
    bg: 'rgba(105, 192, 255,.3)'
  },
  {
    label: '算法管理', //歌曲管理
    path: '/commonConfig/algorithm',
    color: '#b37feb',
    bg: 'rgba(179, 127, 235,.3)'
  },
  {
    label: '相机配置', //合同管理
    path: '/commonConfig/camera',
    color: '#ffd666',
    bg: 'rgba(255, 214, 102,.3)'
  },

])

const toTarget = (path) => {
  router.push({
    path: path,

  })
}
</script>


<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  align-items: center;
}

.page {
  background: #f0f2f5;
  padding: 0;

  .gva-card-box {
    padding: 12px 16px;

    &+.gva-card-box {
      padding-top: 0px;
    }
  }

  .gva-card {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 2px;
    height: auto;
    padding: 26px 30px;
    overflow: hidden;
    box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.03);
  }

  .gva-top-card {
    height: 260px;
    @include flex-center;
    justify-content: space-between;
    color: #777;

    &-left {
      height: 100%;
      display: flex;
      flex-direction: column;

      &-title {
        font-size: 22px;
        color: #343844;
      }

      &-dot {
        font-size: 16px;
        color: #6B7687;
        margin-top: 24px;
      }

      &-rows {
        // margin-top: 15px;
        margin-top: 18px;
        color: #6B7687;
        width: 600px;
        align-items: center;
      }

      &-item {
        +.gva-top-card-left-item {
          margin-top: 24px;
        }

        margin-top: 14px;
      }
    }

    &-right {
      height: 600px;
      width: 600px;
      margin-top: 28px;
    }
  }

  :deep(.a-card__header) {
    padding: 0;
    border-bottom: none;
  }

  .card-header {
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8e8;
  }

  .quick-entrance-title {
    height: 30px;
    font-size: 22px;
    color: #333;
    width: 100%;
    border-bottom: 1px solid #eee;
  }

  .quick-entrance-items {
    @include flex-center;
    justify-content: center;
    text-align: center;
    color: #333;

    .quick-entrance-item {
      padding: 16px 28px;
      margin-top: -16px;
      margin-bottom: -16px;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0px 0px 7px 0px rgba(217, 217, 217, 0.55);
      }

      cursor: pointer;
      height: auto;
      text-align: center;

      // align-items: center;
      &-icon {
        width: 80px;
        height: 80px !important;
        border-radius: 8px;
        @include flex-center;
        justify-content: center;
        margin: 0 auto;

        i {
          font-size: 24px;
        }
      }

      p {
        margin-top: 10px;
      }
    }
  }

  .echart-box {
    padding: 14px;
  }
}

.dashboard-icon {
  font-size: 20px;
  color: rgb(85, 160, 248);
  width: 30px;
  height: 30px;
  margin-right: 10px;
  @include flex-center;
}

.a-row {
  justify-content: center
}

.flex-center {
  @include flex-center;
}

//小屏幕不显示右侧，将登录框居中
@media (max-width: 750px) {
  .gva-card {
    padding: 20px 10px !important;

    .gva-top-card {
      height: auto;

      &-left {
        &-title {
          font-size: 20px !important;
        }

        &-rows {
          margin-top: 15px;
          align-items: center;
        }
      }

      &-right {
        display: none;
      }
    }

    .gva-middle-card {
      &-item {
        line-height: 20px;
      }
    }

    .dashboard-icon {
      font-size: 18px;
    }
  }
}
</style>
