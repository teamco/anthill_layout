/**
 * Define layout properties
 * @type {{
 *  column: {type: string, disabled: boolean, value: number, visible: boolean},
 *  row: {type: string, disabled: boolean, value: number, visible: boolean},
 *  width: {type: string, disabled: boolean, value: number, visible: boolean},
 *  height: {type: string, disabled: boolean, value: number, visible: boolean},
 *  border: {type: string, disabled: boolean, value: string, visible: boolean},
 *  borderRadius: {type: string, disabled: boolean, value: number, visible: boolean}
 * }}
 */
module.exports = {
  column: {
    type: 'number',
    disabled: false,
    value: 0,
    visible: true
  },
  row: {
    type: 'number',
    disabled: false,
    value: 0,
    visible: true
  },
  width: {
    type: 'text',
    disabled: false,
    value: 0,
    visible: true
  },
  height: {
    type: 'text',
    disabled: false,
    value: 0,
    visible: true
  },
  border: {
    type: 'text',
    disabled: false,
    value: 'none',
    visible: true
  },
  borderRadius: {
    type: 'text',
    disabled: false,
    value: 0,
    visible: true
  }
};