import type { GroupItemProps, ToolbarItemProps, ToolbarProps } from './types'
import ToolbarPlugin, { ToolbarComponent } from './plugin'
import { fontFamilyDefaultData, fontfamily, getToolbarDefaultConfig } from './config'

import type { App } from 'vue'
import Toolbar from './components/ToolBar.vue'
import type { ToolbarOptions } from './plugin'

Toolbar.install = (app: App) => {
  app.component('AmToolbar', Toolbar)
}

export default Toolbar
export {
  ToolbarPlugin,
  ToolbarComponent,
  getToolbarDefaultConfig as getDefaultConfig,
  fontFamilyDefaultData,
  fontfamily,
}
export type { ToolbarOptions, ToolbarProps, GroupItemProps, ToolbarItemProps }
