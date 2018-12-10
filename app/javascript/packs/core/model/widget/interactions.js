/**
 * Define prefs interactions
 * @type {{
 *  overlapping: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  alwaysOnTop: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  setLayerUp: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setLayerDown: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  stretchWidth: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  stretchHeight: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  maximizable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  zoomable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  draggable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  resizable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  freeze: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  expandable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
 *  unsetStick: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToCenterLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToCenterTop: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToCenter: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToCenterBottom: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToCenterRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToTopLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToBottomLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToTopRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
 *  setStickToBottomRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean}
 * }}
 */
module.exports = {
  overlapping: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  alwaysOnTop: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  stretchWidth: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  stretchHeight: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  maximizable: {
    type: 'checkbox',
    disabled: true,
    checked: false,
    visible: true
  },
  zoomable: {
    type: 'checkbox',
    disabled: true,
    checked: false,
    visible: true
  },
  draggable: {
    type: 'checkbox',
    disabled: true,
    checked: false,
    visible: true
  },
  resizable: {
    type: 'checkbox',
    disabled: true,
    checked: false,
    visible: true
  },
  freeze: {
    type: 'checkbox',
    disabled: false,
    checked: false,
    visible: true
  },
  commentable: {
    type: 'checkbox',
    disabled: false,
    checked: true,
    visible: true
  },
  shareable: {
    type: 'checkbox',
    disabled: false,
    checked: true,
    visible: true
  },
  expandable: {
    type: 'checkbox',
    disabled: false,
    checked: true,
    visible: true
  },
  scrollable: {
    type: 'checkbox',
    disabled: false,
    checked: true,
    visible: true
  },
  setLayerUp: {
    type: 'event',
    disabled: false,
    group: 'layer',
    events: ['click'],
    checked: false,
    visible: true,
    separator: true
  },
  setLayerDown: {
    type: 'event',
    disabled: false,
    group: 'layer',
    events: ['click'],
    checked: false,
    visible: true
  },
  unsetStick: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: true,
    visible: true,
    separator: true
  },
  setStickToCenterLeft: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  },
  setStickToCenterTop: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  },
  setStickToCenter: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  },
  setStickToCenterBottom: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  },
  setStickToCenterRight: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  },
  setStickToTopLeft: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  },
  setStickToBottomLeft: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  },
  setStickToTopRight: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  },
  setStickToBottomRight: {
    type: 'event',
    disabled: false,
    group: 'stick',
    events: ['click'],
    checked: false,
    visible: true
  }
};