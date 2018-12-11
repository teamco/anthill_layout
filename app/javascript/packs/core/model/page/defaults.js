/**
 * Define default widget prefs
 * @property PageModel
 * @type {{
 *  uuid: {type: string, disabled: boolean, value},
 *  title: {type: string, disabled: boolean, value},
 *  siteDescription: {type: string, disabled: boolean, value},
 *  siteKeywords: {type: string, disabled: boolean, value},
 *  pageUrl: {type: string, disabled: boolean, value},
 *  pageOpenUrlInDialog: {type: string, disabled: boolean, value},
 *  pageHeader: {type: string, disabled: boolean, value},
 *  pageFooter: {type: string, disabled: boolean, value},
 *  animateSwipe: {type: string, disabled: boolean, value},
 *  showInTabs: {type: string, disabled: boolean, value},
 *  lazyLoading: {type: string, disabled: boolean, value},
 *  outlineContainment: {type: string, disabled: boolean, value},
 *  showInMobile: {type: string, disabled: boolean, value}
 * }}
 */
module.exports = {
  uuid: {
    type: 'text',
    disabled: true,
    value: undefined,
    visible: true
  },
  title: {
    type: 'text',
    disabled: false,
    value: undefined,
    visible: true
  },
  siteDescription: {
    type: 'textarea',
    disabled: false,
    value: undefined,
    visible: true
  },
  siteKeywords: {
    type: 'textarea',
    disabled: false,
    value: undefined,
    visible: true
  },
  pageUrl: {
    type: 'text',
    disabled: false,
    value: undefined,
    visible: true,
    monitor: {
      events: ['blur', 'keydown']
    },
    validate: {
      blank: true
    }
  },
  pageOpenUrlInDialog: {
    type: 'checkbox',
    disabled: true,
    value: false,
    visible: true
  },
  setAsHomePage: {
    type: 'checkbox',
    disabled: false,
    value: false,
    visible: true
  },
  pageHeader: {
    type: 'checkbox',
    disabled: false,
    value: false,
    visible: true
  },
  pageFooter: {
    type: 'checkbox',
    disabled: false,
    value: false,
    visible: true
  },
  animateSwipe: {
    type: 'checkbox',
    disabled: false,
    value: undefined,
    visible: true
  },
  showInTabs: {
    type: 'checkbox',
    disabled: false,
    value: undefined,
    visible: true
  },
  public: {
    type: 'checkbox',
    disabled: false,
    value: false,
    visible: true
  },
  lazyLoading: {
    type: 'checkbox',
    disabled: false,
    value: false,
    visible: true
  },
  outlineContainment: {
    type: 'checkbox',
    disabled: false,
    value: false,
    visible: true
  },
  showInMobile: {
    type: 'checkbox',
    disabled: false,
    value: false,
    visible: true
  }
};