import {
  EditorInterface,
  isEngine,
  isSafari,
  NodeInterface,
  Plugin,
  PluginOptions,
} from '@aomao/engine'
import { CollapseItemProps, GroupItemProps } from '../types'
import locales from '../locales'
import ToolbarComponent, { ToolbarPopup } from './component'
import type { ToolbarValue } from './component'

type Config = Array<{
  title: string
  items: Array<Omit<CollapseItemProps, 'engine'> | string>
}>
export interface ToolbarOptions extends PluginOptions {
  config?: Config
  popup?: {
    items: GroupItemProps[]
  }
}

const defaultConfig = (editor: EditorInterface): Config => {
  return [
    {
      title: editor.language.get<string>('toolbar', 'commonlyUsed', 'title'),
      items: [
        'image-uploader',
        'codeblock',
        'table',
        'file-uploader',
        'video-uploader',
        'math',
        'status',
      ],
    },
  ]
}

class ToolbarPlugin<T extends ToolbarOptions = ToolbarOptions> extends Plugin<T> {
  static get pluginName() {
    return 'toolbar'
  }
  private popup?: ToolbarPopup

  init() {
    if (isEngine(this.editor)) {
      this.editor.on('keydown:slash', this.onSlash)
      this.editor.on('parse:value', this.paserValue)
    }
    this.editor.language.add(locales)
    if (this.options.popup) {
      this.popup = new ToolbarPopup(this.editor, {
        items: this.options.popup.items,
      })
    }
  }

  paserValue = (node: NodeInterface) => {
    if (node.isCard() && node.attributes('name') === ToolbarComponent.cardName) {
      return false
    }
    return true
  }

  onSlash = (event: KeyboardEvent) => {
    if (!isEngine(this.editor)) return
    const { change } = this.editor
    let range = change.range.get()
    const block = this.editor.block.closest(range.startNode)
    const text = block.text().trim()
    if (text === '/' && isSafari) {
      block.empty()
    }

    if ('' === text || ('/' === text && isSafari) || event.ctrlKey || event.metaKey) {
      range = change.range.get()
      if (range.collapsed) {
        event.preventDefault()
        const data = this.options.config || defaultConfig(this.editor)
        const card = this.editor.card.insert(
          ToolbarComponent.cardName,
          {},
          data
        ) as ToolbarComponent<ToolbarValue>
        card.setData(data)
        this.editor.card.activate(card.root)
        range = change.range.get()
        // 选中关键词输入节点
        const keyword = card.find('.data-toolbar-component-keyword')
        range.select(keyword, true)
        range.collapse(false)
        change.range.select(range)
      }
    }
  }

  execute(...args: any): void {
    throw new Error('Method not implemented.')
  }

  destroy() {
    this.popup?.destroy()
    this.editor.off('keydown:slash', this.onSlash)
    this.editor.off('parse:value', this.paserValue)
  }
}
export { ToolbarComponent }
export type { ToolbarValue }
export default ToolbarPlugin
