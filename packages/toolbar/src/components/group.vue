<template>
  <div v-if="!!icon || !!content" class="editor-toolbar-group">
    <AmPopover
      :get-popup-container="getPopupContainer"
      overlay-class-name="editor-toolbar-popover"
      :arrow-point-at-center="true"
      :placement="isMobile ? 'topRight' : undefined"
    >
      <template #content>
        <div
          :class="[
            'editor-toolbar',
            {
              'editor-toolbar-mobile': isMobile && !popup,
              'editor-toolbar-popup': popup,
            },
          ]"
          data-element="ui"
        >
          <template v-for="(item, index) in items" :key="index">
            <AmButton
              v-if="item.type === 'button'"
              :key="index"
              v-bind="item"
              placement="top"
              :engine="engine"
            />
            <AmDropdown
              v-if="item.type === 'dropdown'"
              :key="index"
              v-bind="item"
              placement="top"
              :engine="engine"
            />
            <AmColor
              v-if="item.type === 'color'"
              :key="index"
              v-bind="item"
              placement="top"
              :engine="engine"
            />
            <AmCollapse
              v-if="item.type === 'collapse'"
              :key="index"
              v-bind="item"
              :engine="engine"
            />
          </template>
        </div>
      </template>
      <AmButton name="group-popover" :icon="icon" :content="content" />
    </AmPopover>
  </div>
  <div class="editor-toolbar-group" v-if="!icon && !content">
    <template v-for="(item, index) in items" :key="index">
      <AmButton
        v-if="item.type === 'button'"
        :key="index"
        v-bind="item"
        :engine="engine"
      />
      <AmDropdown
        v-if="item.type === 'dropdown'"
        :key="index"
        v-bind="item"
        :engine="engine"
      />
      <AmColor v-if="item.type === 'color'" :key="index" v-bind="item" :engine="engine" />
      <AmCollapse
        v-if="item.type === 'collapse'"
        :key="index"
        v-bind="item"
        :engine="engine"
      />
    </template>
  </div>
</template>

<script setup lang="ts" name="AmGroup">
import { toRefs } from 'vue'
import { EngineInterface, isMobile } from '@aomao/engine'
import AmPopover from './Popover.vue'
import AmButton from './button.vue'
import AmDropdown from './dropdown.vue'
import AmColor from './color/color.vue'
import AmCollapse from './collapse/collapse.vue'
import { GroupProps } from '../types'

interface IProp {
  engine: EngineInterface
  // TODO: update type definition
  items: any[]
  popup?: boolean
  icon: GroupProps['icon']
  content: GroupProps['content']
}

const props = defineProps<IProp>()

const { icon, content, engine, items, popup } = toRefs(props)

const getPopupContainer = () => {
  document.querySelector('.data-toolbar-popup-wrapper') ||
    document.querySelector('.editor-toolbar') ||
    document.body
}
</script>
<style>
.editor-toolbar-group {
  padding: 4px;
  width: auto;
  border-left: 1px solid #e8e8e8;
  display: flex;
  align-items: stretch;
}

.editor-toolbar .editor-toolbar-group:nth-child(1) {
  border-left: none;
}
</style>
