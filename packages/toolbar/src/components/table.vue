<template>
  <div data-element="ui" class="data-toolbar-table-selector">
    <div class="data-toolbar-table-selector-tr" v-for="row in currentRows" :key="row">
      <div
        v-for="(col, idx) in currentCols"
        :class="[
          { 'data-toolbar-table-selector-td': true },
          { actived: row - 1 < selectedRows && col - 1 < selectedCols },
        ]"
        :key="idx"
        @click="triggerSelect($event, row - 1, col - 1)"
        @mousedown="triggerMouseDown($event)"
        @mouseover="triggerHover(row - 1, col - 1)"
      />
    </div>
    <div class="data-toolbar-table-selector-info">
      {{ selectedRows === undefined ? 0 : selectedRows }}x{{
        selectedCols === undefined ? 0 : selectedCols
      }}
    </div>
  </div>
</template>

<script setup lang="ts" name="AmTable">
import { defineComponent, PropType, ref } from 'vue'

interface IProps {
  maxRows: number
  maxCols: number
  minRows: number
  minCols: number
  onSelect: (event: MouseEvent, rows: number, cols: number) => void
}

const props = defineProps<IProps>()

const maxRows = ref(props.maxRows || 10)
const maxCols = ref(props.maxCols || 10)
const minRows = ref(props.minRows || 4)
const minCols = ref(props.minCols || 4)
const currentRows = ref(4)
const currentCols = ref(4)
const selectedRows = ref(0)
const selectedCols = ref(0)

function triggerMouseDown(event: MouseEvent) {
  event.preventDefault()
}
function triggerSelect(event: MouseEvent, rows: number, cols: number) {
  props.onSelect && props.onSelect(event, rows + 1, cols + 1)
}
function triggerHover(rows: number, cols: number) {
  const showRows = Math.max(minRows.value, Math.min(maxRows.value, rows + 2))
  const showCols = Math.max(minCols.value, Math.min(maxCols.value, cols + 2))
  currentRows.value = showRows
  currentCols.value = showCols
  selectedRows.value = rows + 1
  selectedCols.value = cols + 1
}
</script>
<style>
.data-toolbar-table-selector .data-toolbar-table-selector-tr {
  display: flex;
  flex-wrap: nowrap;
}
.data-toolbar-table-selector
  .data-toolbar-table-selector-tr
  .data-toolbar-table-selector-td {
  width: 20px;
  height: 16px;
  border: 1px solid #d9d9d9;
  margin-right: -1px;
  margin-bottom: -1px;
  cursor: pointer;
}
.data-toolbar-table-selector
  .data-toolbar-table-selector-tr
  .data-toolbar-table-selector-td.actived {
  background: #ddefff;
}
.data-toolbar-table-selector .data-toolbar-table-selector-info {
  text-align: center;
}
</style>
