declare const _default: import('vue').DefineComponent<
  {
    name: {
      readonly type: StringConstructor
      readonly required: true
    }
    engine: import('vue').PropType<
      | import('@aomao/engine').EngineInterface<import('@aomao/engine').EngineOptions>
      | undefined
    >
    icon: StringConstructor
    title: StringConstructor
    search: StringConstructor
    description: import('vue').PropType<
      | string
      | (() => string)
      | import('vue').VNode<
          import('vue').RendererNode,
          import('vue').RendererElement,
          {
            [key: string]: any
          }
        >
    >
    disabled: {
      type: import('vue').PropType<boolean | undefined>
      default: undefined
    }
    prompt: import('vue').PropType<
      | string
      | import('vue').VNode<
          import('vue').RendererNode,
          import('vue').RendererElement,
          {
            [key: string]: any
          }
        >
      | (() => string)
    >
    command: import('vue').PropType<import('../../types').Command>
    autoExecute: {
      type: import('vue').PropType<boolean | undefined>
      default: undefined
    }
    className: StringConstructor
    placement: import('vue').PropType<import('@aomao/engine').Placement>
    onClick: import('vue').PropType<(event: MouseEvent, name: string) => boolean | void>
    onMouseDown: import('vue').PropType<(event: MouseEvent) => void>
  },
  {
    iconIsHtml: boolean
    active: import('vue').Ref<boolean>
    disabled: boolean | undefined
    handleClick: (event: MouseEvent) => void
    handleMouseDown: (event: MouseEvent) => void
    triggerMouseEnter: () => void
    triggerMouseLeave: () => void
  },
  unknown,
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  Record<string, any>,
  string,
  import('vue').VNodeProps &
    import('vue').AllowedComponentProps &
    import('vue').ComponentCustomProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      name: {
        readonly type: StringConstructor
        readonly required: true
      }
      engine: import('vue').PropType<
        | import('@aomao/engine').EngineInterface<import('@aomao/engine').EngineOptions>
        | undefined
      >
      icon: StringConstructor
      title: StringConstructor
      search: StringConstructor
      description: import('vue').PropType<
        | string
        | (() => string)
        | import('vue').VNode<
            import('vue').RendererNode,
            import('vue').RendererElement,
            {
              [key: string]: any
            }
          >
      >
      disabled: {
        type: import('vue').PropType<boolean | undefined>
        default: undefined
      }
      prompt: import('vue').PropType<
        | string
        | import('vue').VNode<
            import('vue').RendererNode,
            import('vue').RendererElement,
            {
              [key: string]: any
            }
          >
        | (() => string)
      >
      command: import('vue').PropType<import('../../types').Command>
      autoExecute: {
        type: import('vue').PropType<boolean | undefined>
        default: undefined
      }
      className: StringConstructor
      placement: import('vue').PropType<import('@aomao/engine').Placement>
      onClick: import('vue').PropType<(event: MouseEvent, name: string) => boolean | void>
      onMouseDown: import('vue').PropType<(event: MouseEvent) => void>
    }>
  >,
  {
    autoExecute: boolean | undefined
    disabled: boolean | undefined
  }
>
export default _default
