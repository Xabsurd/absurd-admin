<script setup lang="ts">
import { reactive, ref } from 'vue';
const state = reactive({});
</script>
<template>
  <button type="button" class="dazzling-button">
    <span>
      <slot></slot>
    </span>
    <div class="content-shadow"></div>
    <div class="content"><slot></slot></div>
  </button>
</template>
<style scoped lang="scss">
.dazzling-button {
  position: relative;
  padding: 8px 15px;
  --bg-color: var(--content-color);
  --border-width: 1px;
  --deg: 45deg;
  --start-color: var(--el-color-primary-light-7);
  --end-color: var(--el-color-primary);
  --bg-opacity: 0.5;
  background-color: var(--bg-color);
  border: none;
  border-radius: var(--el-border-radius-base);
  margin: 0 5px;
  .content {
    position: absolute;
    z-index: 2;
    inset: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content-shadow {
    position: absolute;
    z-index: 2;
    background-color: var(--bg-color);
    inset: 0px;
    border-radius: var(--el-border-radius-base);
    transition: all var(--content-animation-time-same);
    opacity: var(--bg-opacity);
  }
  &.large {
    font-size: 1.5rem;
    padding: 12px 20px;
    --border-width: 1.5px;
  }
  &.success {
    --start-color: var(--el-color-success-light-7);
    --end-color: var(--el-color-success);
  }
  &.warning {
    --start-color: var(--el-color-warning-light-7);
    --end-color: var(--el-color-warning);
  }
  &.danger {
    --start-color: var(--el-color-danger-light-7);
    --end-color: var(--el-color-danger);
  }
  &:active {
    .content-shadow {
      opacity: calc(var(--bg-opacity) + 0.2);
    }
  }

  &::before,
  &::after {
    content: '';
    display: block;
    background: linear-gradient(45deg, var(--start-color), var(--end-color));
    position: absolute;
    inset: calc(var(--border-width) * -0.5);
    z-index: 1;
    transition: all var(--content-animation-time-same);
    border-radius: var(--el-border-radius-base);
  }
  &::after {
    filter: blur(calc(var(--border-width) * 2));
  }
  &:hover::before,
  &:hover::after {
    inset: calc(var(--border-width) * -2);
  }
  &:hover::after {
    filter: blur(calc(var(--border-width) * 5));
  }
  &:active::after {
    inset: calc(var(--border-width) * -5);
    filter: blur(calc(var(--border-width) * 10));
  }
}
</style>
