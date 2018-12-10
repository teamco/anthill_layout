/**
 * Define parallax tab
 * @type {{
 *  allowParallax: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  scrollSpeed: {type: string, disabled: boolean, value: number, visible: boolean},
 *  reactionTo: {type: string, disabled: boolean, list: *[], value: string, visible: boolean},
 *  orientation: {type: string, disabled: boolean, list: *[], value: string, visible: boolean}
 * }}
 */
module.exports = {
  allowParallax: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  scrollSpeed: {
    type: 'text',
    disabled: false,
    value: 1,
    placeholder: 'Horizontal,Vertical',
    visible: true
  },
  orientation: {
    type: 'combobox',
    disabled: false,
    list: [
      {
        type: 'text',
        value: 'Vertical'
      },
      {
        type: 'text',
        value: 'Horizontal'
      },
      {
        type: 'text',
        value: 'Both'
      }
    ],
    value: 'Vertical',
    visible: true,
    label: true
  },
  reactionTo: {
    type: 'combobox',
    disabled: false,
    list: [
      {
        type: 'text',
        value: 'Scroll'
      },
      {
        type: 'text',
        value: 'Mouse move'
      }
    ],
    value: 'Scroll',
    visible: true,
    label: true
  },
  onFinish: {
    type: 'combobox',
    disabled: false,
    list: [
      {
        type: 'text',
        value: 'Hide'
      },
      {
        type: 'text',
        value: 'Fade Out'
      },
      {
        type: 'text',
        value: 'Horizontal'
      },
      {
        type: 'text',
        value: 'Vertical'
      }
    ],
    value: 'Fade Out',
    visible: true,
    label: true
  },
  onFinishDuration: {
    type: 'number',
    disabled: false,
    value: undefined,
    visible: true
  },
  moveRange: {
    type: 'text',
    disabled: false,
    value: undefined,
    placeholder: 'Enter range: Min,Max',
    visible: true
  }
};