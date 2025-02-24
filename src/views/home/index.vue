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
          <template v-if="forecastType !== 'romance'">
            <div v-for="item in starDes" :key="item.key" class="star-desc">
              <div class="star-desc__label">{{ item.label }}</div>
              <div class="star-desc__value">
                <el-rate v-if="item.type === 'star'" v-model="item.value" :colors="RateColors" size="small" disabled>
                </el-rate>
                <div v-else>
                  <span v-if="!item.loading">{{ item.value }}</span>
                  <span v-else>
                    <el-icon class="is-loading"><Loading /> </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="item in romanceDes" :key="item.key" class="star-desc">
              <div class="star-desc__label">{{ item.label }}</div>
              <div class="star-desc__value">
                <el-rate v-if="item.type === 'star'" v-model="item.value" :colors="RateColors" size="small" disabled>
                </el-rate>
                <div v-else>
                  <span v-if="!item.loading">{{ item.value }}</span>
                  <span v-else>
                    <el-icon class="is-loading"><Loading /> </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="main-body__middle">
          <div class="content">{{ daySummary }}</div>
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
              <div class="star-content__des">{{ item.name }}</div>
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
  // { key: 'romance', value: '爱情' },
];

const forecastType = ref('today');
const forecastDate = ref('');
const onChangeForecast = (type) => {
  switch (type) {
    case 'today':
      dateStr.value = dayjs().format('YYYY-MM-DD');
      forecastDate.value = dateStr.value;
      break;
    case 'tomorrow':
      dateStr.value = dayjs().add(1, 'day').format('YYYY-MM-DD');
      forecastDate.value = dateStr.value;
      break;
    case 'week':
      {
        const start = dayjs().startOf('week').format('YYYY-MM-DD');
        const end = dayjs().endOf('week').format('YYYY-MM-DD');
        forecastDate.value = end;
        dateStr.value = `${start}~${end}`;
      }
      break;
    case 'month':
      dateStr.value = dayjs().format('YYYY-MM');
      forecastDate.value = dayjs().endOf('month').format('YYYY-MM-DD');
      break;
    case 'year':
      dateStr.value = dayjs().format('YYYY');
      forecastDate.value = dayjs().endOf('year').format('YYYY-MM-DD');
      break;
    case 'romance':
      dateStr.value = dayjs().format('YYYY');
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
  { name: '综合运势', match: '运势概括', value: '', loading: true },
  { name: '爱情运势', match: '爱情方面', value: '', loading: true },
  { name: '事业学业', match: '事业方面', value: '', loading: true },
  { name: '财富运势', match: '财运方面', value: '', loading: true },
  { name: '健康运势', match: '健康方面', value: '', loading: true },
  { name: '人际关系', match: '感情方面', value: '', loading: true },
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
  { key: 'all', label: '综合指数', match: '综合指数', type: 'star', value: 0 },
  { key: 'work', label: '事业学业', match: '工作指数', type: 'star', value: 0 },
  { key: 'love', label: '爱情指数', match: '爱情指数', type: 'star', value: 0 },
  { key: 'money', label: '财富指数', match: '财运指数', type: 'star', value: 0 },
  { key: 'health', label: '健康指数', match: '健康指数', value: '' },
  { key: 'number', label: '幸运数字', match: '幸运数字', value: '' },
  { key: 'color', label: '幸运颜色', match: '幸运颜色', value: '' },
  { key: 'QFriend', label: '速配星座', match: '贵人星座', value: '' },
  // { key: 'summary', label: '今日概述', match: '今日概述', value: '' },
]);
const daySummary = ref('');
const RateColors = ['#99A9BF', '#F7BA2A', '#FF9900'];

const pageLoad = ref(false);
const forecastMap = arrToMap(forecastOption);
const getAiData = async () => {
  pageLoad.value = true;
  forecastDirection.value.forEach((item) => {
    item.loading = true;
  });
  const dateType = forecastMap[forecastType.value];
  const token = await getTokenApi();
  for (let i = 0; i < forecastDirection.value.length; i++) {
    Api.postApi(
      `/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-tiny-8k?access_token=${token}`,
      {
        messages: [
          {
            role: 'user',
            content: `${starNav.value.astroname}${dateType}${forecastDirection.value[i].name}`,
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
        if (!res.res?.data?.result) {
          forecastDirection.value[i].value = '-';
          forecastDirection.value[i].loading = false;
          return;
        }
        const direction = res.res.data.result.split('\n\n');
        const trimmedArray = direction.slice(1, -1);
        forecastDirection.value[i].value = trimmedArray.reduce((acc, curr) => acc + curr, '');
        forecastDirection.value[i].loading = false;
        forecastDirection.value[i].show = true;
      })
      .finally(() => {
        pageLoad.value = false;
      });
  }
};
const getTokenApi = async () => {
  if (sessionStorage.getItem('token')) {
    return sessionStorage.getItem('token');
  }
  return await Api.getApi(
    '/tokenApi/api/token',
    {},
    {
      baseURL: 'http://112.124.51.234:8080/',
    }
  ).then((res) => {
    if (res.res.data.token) {
      sessionStorage.setItem('token', res.res.data.token);
    }
    return res.res.data.token;
  });
};

const getForecastData = async () => {
  pageLoad.value = true;
  starDes.value.forEach((item) => {
    item.loading = true;
  });
  Api.postQsApi(
    '/star/index',
    {
      astro: starNav.value.astroname,
      date: forecastDate.value || dateStr.value,
      key: '33380ace36c9d4b3308e69b5802ffb3f',
    },
    {
      baseURL: juheUrl,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  )
    .then((res) => {
      if (!res.res.data?.result?.list) {
        return;
      }
      const requestData = res.res.data?.result?.list;
      starDes.value.forEach((item) => {
        const valueItem = requestData.find((data) => data.type == item.match);
        if (!valueItem) {
          return;
        }
        if (item.type === 'star') {
          const numberItem = Number(valueItem.content.replace('%', ''));
          item.value = Math.floor(numberItem / 20);
        } else {
          item.value = valueItem.content;
        }
        item.loading = false;
      });
      starDes.value.forEach((item) => {
        if (!item.loading) {
          return;
        }
        if (item.type === 'star') {
          item.value = 0;
        } else {
          item.value = '-';
        }
        item.loading = false;
      });
    })
    .finally(() => {
      pageLoad.value = false;
    });
};

const romanceDes = ref([
  { key: 'overall', label: '综合运势', match: '综合运势', type: 'star', value: 0 },
  { key: 'female', label: '女生指数', match: '女生指数', type: 'star', value: 0 },
  { key: 'male', label: '男生指数', match: '男生指数', type: 'star', value: 0 },
]);
// const getLoveData = () => {
//   Api.postQsApi(
//     '/love/index',
//     {
//       key: '33380ace36c9d4b3308e69b5802ffb3f',
//     },
//     {
//       baseURL: juheUrl,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     }
//   );
// };

onMounted(() => {
  dateStr.value = dayjs().format('YYYY-MM-DD');
  getForecastData();
  getAiData();
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
    margin: 10vh 0 10vh 0;
    display: flex;
    flex-direction: column;
    width: calc(100vw - 10%);
    height: auto;
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
      overflow-y: auto;
      overflow-x: hidden;
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
        font-size: 14px;
        text-align: center;
        padding: 6px 8px;
        border-radius: 32px;
        background: #efecff;
        color: #735afd;
        word-break: keep-all;
        & + .forecast-btn {
          margin-left: 5px;
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
          font-size: 12px;
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
          white-space: nowrap;
          margin-right: 10px;
        }
        &__value {
          color: #735afd;
        }
      }
      .el-rate {
        height: 28px;

        .el-rate__icon {
          font-size: 14px;
          margin-right: 0;
        }
      }
    }
    &__middle {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 24px;
      margin-bottom: 10px;

      .content {
        max-width: 50%;
        color: #735afd;
        background-color: #dfe9f3;
      }

      &::after {
        position: absolute;
        content: '';
        top: 50%;
        left: 50%;
        width: 50%;
        height: 2px;
        border-bottom: 2px dashed transparent;
        background: linear-gradient(white, white) padding-box,
          repeating-linear-gradient(-45deg, #eae9ef 0, #eae9ef 0.25em, white 0, white 0.75em);
      }
      &::before {
        position: absolute;
        content: '';
        top: 50%;
        left: 0;
        width: 50%;
        height: 2px;
        border-bottom: 2px dashed transparent;
        background: linear-gradient(white, white) padding-box,
          repeating-linear-gradient(-45deg, #eae9ef 0, #eae9ef 0.25em, white 0, white 0.75em);
      }
    }
    &__desc {
      flex: 1;
      display: flex;
      flex-wrap: wrap;

      .star-content__des {
        margin-bottom: 18px;
        width: 50%;
        color: #735afd;
        font-size: 20px;
        font-weight: bolder;
      }
      .star-content__value {
        margin-bottom: 18px;
        width: 100%;
        // color: #735afd;
        font-size: 16px;
        padding-bottom: 20px;
        border-bottom: 2px dashed #eae9ef;
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
