<template>
  <div id="home" :class="`${pageLoad ? 'loading' : ''}`">
    <div class="main-body__wrapper">
      <div :class="`main-body ${selectModel ? 'loading' : ''}`">
        <div class="main-body__header">
          <div class="main-body__header-left">
            <div class="avatar">
              <MxIcon :name="starNav.icon"></MxIcon>
            </div>
            <div class="desc">
              <div class="desc-name">{{ starNav.astroname }}</div>
              <div class="desc-date">{{ starNav.date }}</div>
            </div>
          </div>
          <div class="main-body__header-right">
            <div class="change" @click="selectModel = true">
              <el-icon><Sort /></el-icon>
            </div>
          </div>
        </div>

        <div class="main-body__content">
          <div
            v-for="item in forecastOption"
            :key="item.key"
            :class="`forecast-btn ${forecastType === item.key ? 'active' : ''}`"
            @click="onChangeForecast(item.key)"
          >
            {{ item.value }}
          </div>
          <div class="star-date">
            <div>{{ dateStr }}</div>
          </div>
        </div>
        <div class="main-body__summary">
          <div v-for="item in starDes" :key="item.key" class="star-desc" :rows="5" :loading="item.loading" animated>
            <div class="star-desc__label">{{ item.label }}</div>
            <div class="star-desc__value">
              <el-rate v-if="item.type === 'star'" v-model="item.value" :colors="RateColors" size="small"> </el-rate>
              <div v-else>{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="main-body__desc">
          <el-skeleton
            v-for="item in forecastDirection"
            :key="item.key"
            class="star-content"
            :rows="5"
            :loading="item.loading"
            animated
          >
            <template #template> </template>
            <template #default>
              <div class="star-content__des">{{ item.key }}</div>
              <div class="star-content__value">{{ item.value }}</div>
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>
    <div v-show="selectModel" class="select-model">
      <div class="select-model__header"></div>
      <div class="select-model__body">
        <div
          v-for="item in starNavData"
          :key="item.astroid"
          :class="`nav-item ${starNav.astroid === item.astroid ? 'active' : ''}`"
          @click="onNavChange(item)"
        >
          <div class="nav-item__title">{{ item.astroname }}</div>
          <div class="nav-item__date">{{ item.date }}</div>
        </div>
      </div>
      <div class="select-model__footer">
        <div class="close" @click="selectModel = false">
          <el-icon><CircleClose /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="HomePage">
import dayjs from 'dayjs';
import * as Api from '@/api';
import { arrToMap } from '@/utils';
import { juheUrl, baiduUrl } from '@/config';

const forecastOption = [
  { key: 'today', value: '今日' },
  { key: 'tomorrow', value: '明日' },
  { key: 'week', value: '本周' },
  { key: 'month', value: '本月' },
  { key: 'year', value: '本年' },
  { key: 'romance', value: '爱情' },
];

const forecastType = ref('today');
const onChangeForecast = (type) => {
  switch (type) {
    case 'today':
      dateStr.value = dayjs().format('YYYY-MM-DD');
      break;
    case 'tomorrow':
      dateStr.value = dayjs().add(1, 'day').format('YYYY-MM-DD');
      break;
    case 'week':
      {
        const start = dayjs().startOf('week').format('YYYY-MM-DD');
        const end = dayjs().endOf('week').format('YYYY-MM-DD');
        dateStr.value = `${start}~${end}`;
      }
      break;
    case 'month':
      dateStr.value = dayjs().format('YYYY-MM');
      break;
    case 'year':
      dateStr.value = dayjs().format('YYYY');
      break;
    case 'romance':
      dateStr.value = dayjs().format('YYYY-MM-DD');
      break;
    default:
      break;
  }
  forecastType.value = type;
  getForecastData();
  getAiData();
};

const dateStr = ref('');

const forecastDirection = ref([
  { name: '综合运势', value: '', loading: true },
  { name: '爱情运势', value: '', loading: true },
  { name: '事业学业', value: '', loading: true },
  { name: '财富运势', value: '', loading: true },
  { name: '爱情运势', value: '', loading: true },
  { name: '健康指数', value: '', loading: true },
  { name: '幸运颜色', value: '', loading: true },
  { name: '幸运数字', value: '', loading: true },
  { name: '速配星座', value: '', loading: true },
]);

const starNavData = [
  {
    astroid: '1',
    astroname: '白羊座',
    icon: 'baiyangzuo',
    date: '3-21~4-19',
  },
  {
    astroid: '2',
    icon: 'jinniuzuo',
    astroname: '金牛座',
    date: '4-20~5-20',
  },
  {
    astroid: '3',
    icon: 'shuangzizuo',
    astroname: '双子座',
    date: '5-21~6-21',
  },
  {
    astroid: '4',
    icon: 'juxiezuo',
    astroname: '巨蟹座',
    date: '6-22~7-22',
  },
  {
    astroid: '5',
    icon: 'shizizuo',
    astroname: '狮子座',
    date: '7-23~8-22',
  },
  {
    astroid: '6',
    icon: 'chunvzuo',
    astroname: '处女座',
    date: '8-23~9-22',
  },
  {
    astroid: '7',
    icon: 'tianchengzuo',
    astroname: '天秤座',
    date: '9-23~10-23',
  },
  {
    astroid: '8',
    icon: 'tianxiezuo',
    astroname: '天蝎座',
    date: '10-24~11-22',
  },
  {
    astroid: '9',
    icon: 'sheshouzuo',
    astroname: '射手座',
    date: '11-23~12-21',
  },
  {
    astroid: '10',
    icon: 'mojiezuo',
    astroname: '摩羯座',
    date: '12-22~1-19',
  },
  {
    astroid: '11',
    icon: 'shuipingzuo',
    astroname: '水瓶座',
    date: '1-20~2-18',
  },
  {
    astroid: '12',
    icon: 'shuangyuzuo',
    astroname: '双鱼座',
    date: '2-19~3-20',
  },
];
const starNav = ref(starNavData[0]);
const selectModel = ref(false);
const onNavChange = (item) => {
  starNav.value = item;
  getForecastData();
  getAiData();
  setTimeout(() => {
    selectModel.value = false;
  }, 300);
};

const starDes = ref([
  { key: 'all', label: '综合运势', type: 'star', value: 0 },
  { key: 'work', label: '事业学业', type: 'star', value: 0 },
  { key: 'love', label: '爱情运势', type: 'star', value: 0 },
  { key: 'money', label: '财富运势', type: 'star', value: 0 },
  { key: 'health', label: '健康指数', value: '' },
  { key: 'number', label: '幸运数字', value: '' },
  { key: 'color', label: '幸运颜色', value: '' },
  { key: 'QFriend', label: '速配星座', value: '' },
  // { key: 'summary', label: '今日概述', value: '' },
]);
const RateColors = ['#99A9BF', '#F7BA2A', '#FF9900'];

const pageLoad = ref(false);
const forecastMap = arrToMap(forecastOption);
const getAiData = async () => {
  pageLoad.value = true;
  forecastDirection.value.forEach((item) => {
    item.loading = true;
  });
  const dateStr = forecastMap[forecastType.value];
  Api.postApi(
    '/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-tiny-8k?access_token=24.72e51227ded9c1e3b79f94bd99e02417.2592000.1731740058.282335-115902331',
    {
      messages: [
        {
          role: 'user',
          content: `${starNav.value.astroname}${dateStr}运势`,
        },
      ],
      temperature: 0.95,
      top_p: 0.7,
      penalty_score: 1,
    },
    {
      baseURL: baiduUrl,
    }
  )
    .then((res) => {
      if (!res?.data) {
        return;
      }
      forecastDirection.value.forEach((item) => {
        if (item.type === 'star') {
          item.value = Math.floor(res.data[item.key] / 20);
        } else {
          item.value = res.data[item.key];
        }
        item.loading = false;
      });
    })
    .finally(() => {
      pageLoad.value = false;
    });
};

const getForecastData = async () => {
  pageLoad.value = true;
  // starDes.value.forEach((item) => {
  //   item.loading = true;
  // });
  Api.getApi(
    '/constellation/getAll',
    {
      consName: starNav.value.astroname,
      type: forecastType.value,
      key: 'c28ef3234057424111f5d2b93364806f',
    },
    {
      baseURL: juheUrl,
    }
  )
    .then((res) => {
      console.log('res: ', res);
      if (!res?.res?.data) {
        return;
      }
      const requestData = res.res.data;
      console.log('res?.data: ', res?.data);
      starDes.value.forEach((item) => {
        if (item.type === 'star') {
          item.value = Math.floor(requestData[item.key] / 20);
        } else {
          item.value = requestData[item.key];
        }
        item.loading = false;
      });
    })
    .finally(() => {
      pageLoad.value = false;
    });
};

onMounted(() => {
  getForecastData();
  getAiData();
  dateStr.value = dayjs().format('YYYY-MM-DD');
});
onBeforeUnmount(() => {});
</script>

<style lang="scss">
#home {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #7961fd;

  .main-body {
    position: relative;
    margin: 10vh 0 0 0;
    width: calc(100vw - 10%);
    height: 100%;
    background-image: linear-gradient(to top, #dfe9f3 0%, white 30%);
    border-radius: 48px 48px 28px 28px;
    padding: 38px 15px 30px;
    z-index: 10;
    box-sizing: border-box;
    box-shadow: 1px 2px 4px 0 rgb(0 58 152 / 10%), 0 0 3px 0 rgb(0 0 0 / 10%);

    &__wrapper {
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin: 0;
      background: {
        image: url(@/assets/images/bg.png);
        position: center top;
        size: 100%;
        repeat: no-repeat;
      }
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-left {
        display: flex;
        .avatar {
          display: flex;
          align-items: center;
          width: 60px;
          height: 60px;
          font-size: 60px;
          background-color: #735afd;
          border-radius: 50%;
        }
        .desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 5px;
          margin-left: 10px;

          &-name {
            font-weight: bold;
            color: #141f48;
            line-height: 24px;
            font-size: 24px;
          }
          &-date {
            line-height: 16px;
            font-size: 16px;
            color: #999;
          }
        }
      }
      &-right {
        .change {
          margin-right: 10px;
          .el-icon {
            transform: rotate(90deg);
            font-size: 28px;
            border: 2px solid #7961fd;
            border-radius: 50%;
            color: #7961fd;
          }
        }
      }
    }
    &__content {
      position: relative;
      padding: 24px 5px 42px;
      display: flex;
      margin-bottom: 16px;
      justify-content: space-between;
      border-bottom: 2px dashed transparent;
      background: linear-gradient(white, white) padding-box,
        repeating-linear-gradient(-45deg, #eae9ef 0, #eae9ef 0.25em, white 0, white 0.75em);

      .forecast-btn {
        flex: 1;
        cursor: pointer;
        font-size: 16px;
        text-align: center;
        padding: 6px 0px;
        border-radius: 32px;
        background: #efecff;
        color: #735afd;
        word-break: keep-all;
        & + .forecast-btn {
          margin-left: 10px;
        }
        &.active {
          color: white;
          font-weight: bold;
          background: linear-gradient(90deg, #735afd 0%, #b63af3 100%);
        }
      }
      .star-date {
        position: absolute;
        right: -15px;
        bottom: -12px;
        div {
          background: linear-gradient(90deg, #735afd 0%, #b63af3 100%);
          padding: 4px 20px;
          border-radius: 80px 0px 0px 80px;
          color: white;
          font-size: 14px;
          display: inline-block;
        }
      }
    }
    &__summary {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 5px 0 10px 0;
      color: #735afd;

      .star-desc {
        display: flex;
        align-items: center;
        width: 50%;
        line-height: 28px;
        margin: 5px 0;
        color: #181f64;
        font-size: 14px;
        &__label {
          margin-right: 10px;
        }
      }
      .el-rate {
        height: 28px;
      }
    }

    &.loading {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0 0 0 / 30%);
      }
    }
  }
  .select-model {
    position: absolute;
    z-index: 20;
    top: 5vh;
    width: 100%;
    height: 40vh;
    // background-color: transparent;

    &__header {
      width: 100%;
      height: 5vh;
      background: {
        image: url(@/assets/images/select_bg.png);
        position: center center;
        size: contain;
        repeat: no-repeat;
      }
    }
    &__body {
      display: flex;
      flex-wrap: wrap;
      margin-top: -5px;
      background-image: linear-gradient(to top, #dfe9f3 0%, white 30%);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;

      .nav-item {
        font-size: 14px;
        word-break: keep-all;
        width: 33%;
        margin-bottom: 50px;
        padding: 10px 0;
        color: rgb(0, 0, 0, 0.8);
        position: relative;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;

        &__title {
          display: flex;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
        }
        &__date {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }
        &.active {
          color: #735afd;
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: rgba(115, 90, 253, 0.3);

          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -2px;
            height: 6px;
            background: #735afd;
            opacity: 0.8;
            margin: auto;
            width: 80px;
            border-radius: 8px;
          }
        }
      }
    }
    &__footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      // height: 25px;
      color: #fff;

      font-size: 24px;
      font-weight: bold;
    }
  }
  &.loading {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 19;
      width: 100%;
      height: 100%;
      background-color: rgb(0 0 0 / 30%);
    }
  }
}
</style>
