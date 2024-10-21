<template>
  <i v-if="isExternal" v-bind="$attrs" class="svg-icon svg-icon-external" :style="iconStyle"></i>
  <svg v-else v-bind="$attrs" :class="[iconClass, { gradient: gradient, shadow: shadow }]" aria-hidden="true">
    <use :xlink:href="iconName" />
    <defs>
      <linearGradient id="linear_gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" />
        <stop offset="1" stop-color="#1b88fe" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    // 图标名称
    name: {
      type: String,
      required: true,
    },
    // 图标渐变
    gradient: {
      type: Boolean,
      default: false,
    },
    // 高亮阴影
    shadow: {
      type: Boolean,
      default: false,
    },
    // 图标类名
    className: {
      type: String,
      default: 'mx-icon',
    },
  },
  computed: {
    isExternal() {
      return /^(https?:|mailto:|tel:)/.test(this.name);
    },
    iconName() {
      return `#icon-${this.name}`;
    },
    iconClass() {
      return `svg-icon ${this.className}`;
    },
    iconStyle() {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.name}) no-repeat 50% 50%`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
  cursor: pointer;
  outline: none;

  &.gradient {
    fill: url(#linear_gradient);
  }
  // &.shadow {
  //   filter: drop-shadow(0 0 5px $color-success);
  // }
}
.svg-icon-external {
  display: inline-block;
  mask-size: cover !important;
  background-color: currentColor;
}
</style>
