/**
 * @type {{
 *  title: {type: string, disabled: boolean, value: undefined, visible: boolean},
 *  description: {type: string, disabled: boolean, value: undefined, visible: boolean},
 *  widgetUrl: {type: string, disabled: boolean, value: undefined, visible: boolean},
 *  onClickOpenUrl: {type: string, disabled: boolean, value: undefined, visible: boolean},
 *  customClassName: {type: string, disabled: boolean, value: undefined, visible: boolean},
 *  header: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  footer: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  statistics: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  hideContentOnDrag: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  hideContentOnResize: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  pageContainment: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  showInMobile: {type: string, disabled: boolean, value: boolean, visible: boolean}
 * }}
 */
module.exports = {
  title: {
    type: 'text',
    disabled: false,
    value: undefined,
    visible: true
  },
  description: {
    type: 'textarea',
    disabled: false,
    value: undefined,
    visible: true
  },
  widgetUrl: {
    type: 'textarea',
    disabled: true,
    value: undefined,
    visible: true
  },
  onClickOpenUrl: {
    type: 'textarea',
    disabled: false,
    value: undefined,
    visible: true
  },
  customClassName: {
    type: 'text',
    disabled: false,
    value: undefined,
    visible: true
  },
  header: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  footer: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  statistics: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  hideContentOnDrag: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  hideContentOnResize: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  pageContainment: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  showInMobile: {
    type: 'checkbox',
    disabled: false,
    value: false,
    visible: true
  }
};