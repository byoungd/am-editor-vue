<template>
  <a-spin class="loading" :tip="text" :spinning="loading">
    <slot></slot>
  </a-spin>
</template>

<script setup lang="ts" name="AmLoading">
import ASpin from 'ant-design-vue/es/spin'
import 'ant-design-vue/es/spin/style'
interface IProps {
  text: string
  loading: boolean
}
defineProps<IProps>()
</script>
<style css>
.loading {
  padding: 20px;
  display: block;
}

.ant-spin-nested-loading {
  position: inherit;
}
.ant-spin-nested-loading .ant-spin-container {
  position: inherit;
}
</style>
