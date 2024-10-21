<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

export default defineComponent({
  setup() {
    // 切换为中文
    const locale = zhCn;
    return { locale };
  },
});
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
