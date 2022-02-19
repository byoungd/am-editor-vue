import { GroupItemProps } from '@aomao/toolbar-vue'

export const defaultContent = '<h1>Hello Editor</h1>'

export const getDefaultToolbarItems = (isMobile: boolean): GroupItemProps[] => {
  return isMobile
    ? [
        ['undo', 'redo'],
        {
          icon: 'text',
          items: ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
        },
        [
          {
            type: 'button',
            name: 'image-uploader',
            icon: 'image',
          },
          'link',
          'tasklist',
          'heading',
        ],
        {
          icon: 'more',
          items: [
            {
              type: 'button',
              name: 'video-uploader',
              icon: 'video',
            },
            {
              type: 'button',
              name: 'file-uploader',
              icon: 'attachment',
            },
            {
              type: 'button',
              name: 'table',
              icon: 'table',
            },
            {
              type: 'button',
              name: 'math',
              icon: 'math',
            },
            {
              type: 'button',
              name: 'codeblock',
              icon: 'codeblock',
            },
            {
              type: 'button',
              name: 'orderedlist',
              icon: 'orderedlist',
            },
            {
              type: 'button',
              name: 'unorderedlist',
              icon: 'unorderedlist',
            },
            {
              type: 'button',
              name: 'hr',
              icon: 'hr',
            },
          ],
        },
      ]
    : [
        ['collapse'],
        ['undo', 'redo', 'paintformat', 'removeformat'],
        ['heading', 'fontfamily', 'fontsize'],
        ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
        ['fontcolor', 'backcolor'],
        ['alignment'],
        ['unorderedlist', 'orderedlist', 'tasklist', 'indent', 'line-height'],
        ['link', 'quote', 'hr'],
      ]
}
