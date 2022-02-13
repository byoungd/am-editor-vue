<template>
  <div
    :class="[
      'toolbar-dropdown',
      'colorpicker-button',
      { 'toolbar-dropdown-right': isRight },
    ]"
    ref="buttonRef"
  >
    <div
      :class="[
        'toolbar-dropdown-trigger colorpicker-button-group',
        { 'colorpicker-button-group-active': visible },
      ]"
    >
      <am-button
        class="colorpicker-button-text"
        :name="name"
        :title="buttonTitle"
        :on-click="triggerClick"
        :disabled="disabled"
        :placement="placement"
      >
        <span v-html="buttonContent"></span>
      </am-button>
      <am-button
        class="colorpicker-button-dropdown toolbar-dropdown-trigger-arrow"
        :name="name"
        :title="dropdownTitle"
        :on-click="toggleDropdown"
        :disabled="disabled"
        :placement="placement"
        ref="targetRef"
      >
        <template #icon>
          <span class="colorpicker-button-dropdown-empty" />
        </template>
        <span class="data-icon data-icon-arrow" />
      </am-button>
    </div>
    <div v-if="visible" class="toolbar-dropdown-list" data-element="ui">
      <am-color-picker
        v-if="engine"
        :engine="engine"
        :colors="colors"
        :default-active-color="currentColor"
        :default-color="defaultColor"
        :on-select="triggerSelect"
        :set-stroke="setStroke"
      />
    </div>
  </div>
</template>
<script setup lang="ts" name="AmColor">
import { onUnmounted, ref, watch, Ref, toRefs } from 'vue'
import { ColorProps } from '../../types'
import { useRight } from '../../hooks'
import AmButton from '../button.vue'
import AmColorPicker from './picker/picker.vue'
import Palette from './picker/palette'
import { EngineInterface, EngineOptions } from '@aomao/engine'
import { IPropContent } from '../IPropTypes'

interface IProp {
  name: string
  buttonTitle: string
  defaultColor: string
  defaultActiveColor: string
  content: IPropContent
  engine?: EngineInterface<EngineOptions>
  colors?: ColorProps['colors']
  disabled: ColorProps['disabled']
  placement?: ColorProps['placement']
  dropdownTitle: ColorProps['dropdownTitle']
  autoExecute?: ColorProps['autoExecute']
  command?: ColorProps['command']
  onSelect?: ColorProps['onSelect']
  setStroke?: ColorProps['setStroke']
}

const props = defineProps<IProp>()

const { name, disabled, placement, dropdownTitle, colors, setStroke } = toRefs(props)

const visible = ref(false)

const buttonRef = ref<HTMLDivElement | null>(null)
const isRight = useRight(buttonRef as Ref<HTMLElement | null>)
const targetRef = ref<typeof AmButton | undefined>(undefined)
const currentColor = ref(props.defaultActiveColor)

const getContent = () => {
  const isStr = typeof props.content === 'string'
  const isFn = typeof props.content === 'function'
  return isStr
    ? props.content
    : isFn
    ? props.content(
        currentColor.value,
        Palette.getStroke(currentColor.value),
        props.disabled
      )
    : ''
}

const buttonContent = ref(getContent())

const toggleDropdown = (event: MouseEvent) => {
  event.preventDefault()

  if (visible.value) {
    hideDropdown()
  } else {
    showDropdown()
  }
}

const showDropdown = () => {
  visible.value = true
}

const hideDropdown = (event?: MouseEvent) => {
  if (
    event &&
    targetRef.value?.element &&
    targetRef.value.element.contains(event.target as Node)
  )
    return
  visible.value = false
}

watch(
  () => visible.value,
  (value) => {
    if (value) document.addEventListener('click', hideDropdown)
    else document.removeEventListener('click', hideDropdown)
  }
)

const triggerClick = (event: MouseEvent) => {
  triggerSelect(currentColor.value, event)
}

const triggerSelect = (color: string, event: MouseEvent) => {
  hideDropdown()
  currentColor.value = color
  buttonContent.value =
    typeof props.content === 'string'
      ? props.content
      : props.content(color, Palette.getStroke(color), props.disabled)

  if (props.autoExecute !== false) {
    let commandName = props.name
    let commandArgs = [color, props.defaultColor]
    if (props.command) {
      if (!Array.isArray(props.command)) {
        commandName = props.command.name
        commandArgs = props.command.args
      } else {
        commandArgs = props.command
      }
    }
    commandName && props.engine?.command.execute(commandName, ...commandArgs)
  }
  if (props.onSelect) props.onSelect(color, event)
}

onUnmounted(() => document.removeEventListener('click', hideDropdown))

watch(
  () => ({ ...props }),
  () => (buttonContent.value = getContent())
)
</script>
<style>
.editor-toolbar .colorpicker-button .colorpicker-button-group {
  padding: 0 2px;
}

.colorpicker-button-group .toolbar-button {
  padding: 0;
}

.colorpicker-button-group .colorpicker-button-text {
  margin-right: 0;
  min-width: 26px;
  border-radius: 3px 0 0 3px;
  display: block;
}

.editor-toolbar.editor-toolbar-popup .colorpicker-button-group .colorpicker-button-text {
  margin: 0;
  border-radius: 3px 0 0 3px;
}

.colorpicker-button-group .colorpicker-button-text:active {
  background-color: #e8e8e8;
}

.colorpicker-button-group .colorpicker-button-dropdown {
  margin-left: -1px;
  min-width: 17px;
  text-align: center;
  padding: 0 0;
  border-radius: 0 3px 3px 0;
  display: block;
}

.editor-toolbar.editor-toolbar-popup
  .colorpicker-button-group
  .colorpicker-button-dropdown {
  line-height: 24px;
  min-width: 17px;
  padding: 0 4px;
  margin: 0;
  margin-left: -1px;
  border-radius: 0 3px 3px 0;
}

.colorpicker-button-group .colorpicker-button-dropdown:hover,
.colorpicker-button-group .colorpicker-button-dropdown:active {
  background-color: #e8e8e8;
}

.colorpicker-button-group
  .colorpicker-button-dropdown
  .colorpicker-button-dropdown-empty {
  display: inline-block;
}

.colorpicker-button-group:hover .toolbar-button {
  border: 1px solid #e8e8e8;
}
.colorpicker-button-group-active .toolbar-button,
.colorpicker-button-group-active:hover .toolbar-button {
  border: 1px solid #e8e8e8;
}
</style>
