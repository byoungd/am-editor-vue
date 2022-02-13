<script setup lang="ts" name="ToolTip">
import { Placement } from '@aomao/engine'

interface IProp {
  placement: Placement
}
defineProps<IProp>()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
