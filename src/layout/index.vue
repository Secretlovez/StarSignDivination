<template>
  <el-container id="layout" direction="vertical">
    <el-main class="layout-main">
      <RouterView v-slot="{ Component }" :key="routerKey">
        <Transition
          enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster"
          appear-active-class="animate__animated animate__fadeIn animate__faster"
          appear
        >
          <Component :is="Component"></Component>
        </Transition>
      </RouterView>
    </el-main>
  </el-container>
</template>

<script setup name="AppLayout">
import mitt from '@/utils/mitt';

const routerKey = ref('key');

onBeforeUnmount(() => {
  mitt.all.clear();
});
</script>

<style lang="scss">
#layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .layout-main {
    flex: auto;
    width: 100%;
    height: calc(100% - 12vh);
    padding: 10px;
    overflow: visible;
    // background-color: $bg-base;

    > div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
