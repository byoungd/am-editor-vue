import { EngineInterface, EngineOptions } from '@aomao/engine'
import { GroupItemProps, ToolbarItemProps } from './../types'

export type IPropEngine = EngineInterface<EngineOptions>

export type IPropItems = GroupItemProps

export type IPropToolbarItem = ToolbarItemProps

export type IPropPopup = boolean | undefined

export type IPropContent =
  | string
  | ((color: string, stroke: string, disabled?: boolean | undefined) => string)
