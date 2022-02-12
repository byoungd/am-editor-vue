<template>
  <div class="loading">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="AmLoading">
interface IProps {
  loading: boolean
}
defineProps<IProps>()
</script>
<style css>
.loading {
  display: inline-block;
}

.ant-spin-nested-loading {
  position: inherit;
}
.ant-spin-nested-loading .ant-spin-container {
  position: inherit;
}
</style>
