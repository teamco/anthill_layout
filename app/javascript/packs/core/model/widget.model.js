/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseModel} from '../../modules/Model';

/**
 * @constant WidgetModel
 * @type {WidgetModel}
 * @extends BaseModel
 */
export class WidgetModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'WidgetModel', scope);

    /**
     * @constant defaults
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
    const defaults = {
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
    const interactions = {
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
    const layout = {
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

    /**
     * Define parallax tab
     * @type {{
     *  allowParallax: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *  scrollSpeed: {type: string, disabled: boolean, value: number, visible: boolean},
     *  reactionTo: {type: string, disabled: boolean, list: *[], value: string, visible: boolean},
     *  orientation: {type: string, disabled: boolean, list: *[], value: string, visible: boolean}
     * }}
     */
    const parallax = {
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

    /**
     * Define widget prefs
     * @property WidgetModel
     * @type {{
     *  defaults: {
     *    title: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    description: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    widgetUrl: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    onClickOpenUrl: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    customClassName: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    scrollSpeed: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    statistics: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    hideContentOnDrag: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    hideContentOnResize: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    pageContainment: {type: string, disabled: boolean, value: undefined, visible: boolean},
     *    showInMobile: {type: string, disabled: boolean, value: undefined, visible: boolean}
     *  },
     *  interactions: {
     *    overlapping: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    alwaysOnTop: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    setLayerUp: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setLayerDown: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    stretchWidth: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    stretchHeight: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    maximizable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    zoomable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    draggable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    resizable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    freeze: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    expandable: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    unsetStick: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToCenterLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToCenterTop: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToCenter: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToCenterBottom: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToCenterRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToTopLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToBottomLeft: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToTopRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean},
     *    setStickToBottomRight: {type: string, disabled: boolean, group: string, events: string[], checked: boolean, visible: boolean}
     *  },
     *  layout: {
     *    column: {type: string, disabled: boolean, value: number, visible: boolean},
     *    row: {type: string, disabled: boolean, value: number, visible: boolean},
     *    width: {type: string, disabled: boolean, value: number, visible: boolean},
     *    height: {type: string, disabled: boolean, value: number, visible: boolean},
     *    border: {type: string, disabled: boolean, value: string, visible: boolean},
     *    borderRadius: {type: string, disabled: boolean, value: number, visible: boolean}
     *  },
     *  parallax: {
     *    allowParallax: {type: string, disabled: boolean, checked: boolean, visible: boolean},
     *    scrollSpeed: {type: string, disabled: boolean, value: number, visible: boolean},
     *    reactionTo: {type: string, disabled: boolean, list: *[], value: string, visible: boolean},
     *    orientation: {type: string, disabled: boolean, list: *[], value: string, visible: boolean}
     *  }
     * }}
     */
    this.preferences = {
      defaults: defaults,
      interactions: interactions,
      layout: layout,
      parallax: parallax
    };
  }

  /**
   * Define DOM
   * @memberOf WidgetModel
   */
  defineDOM() {

    /**
     * Update DOM
     * @property WidgetModel
     * @type {*}
     */
    this.scope.dom = this.scope.map.getDOM();
  }

  /**
   * Get DOM
   * @memberOf WidgetModel
   * @returns {*}
   */
  getDOM() {
    return this.scope.dom;
  }

  /**
   * Update DOM
   * @memberOf WidgetModel
   * @param {*} hash
   * @returns {*}
   */
  updateDOM(hash) {

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;

    scope.logger.debug('Update DOM', hash);
    $.extend(true, scope.dom, hash);
    return scope;
  }

  /**
   * Get attributes
   * @memberOf WidgetModel
   * @returns {*}
   */
  getAttributes() {
    return this.getConfig('attributes');
  }

  /**
   * Set attributes
   * @memberOf WidgetModel
   * @param key
   * @param value
   */
  setAttributes(key, value) {
    this.scope.logger.debug('Set widget attributes', arguments);
    this.getAttributes()[key] = value;
  }

  /**
   * Update rules
   * @memberOf WidgetModel
   * @param data
   */
  updateRules(data) {

    /**
     * Get rules
     * @type {*}
     */
    const rules = this.getConfig('rules');

    for (let index in data) {
      if (data.hasOwnProperty(index)) {
        rules[index] = data[index];
      }
    }
  }

  /**
   * Define subscribers
   * @memberOf WidgetModel
   * @param {string} event
   * @param {Widget} subscriber
   */
  setSubscriber(event, subscriber) {

    /**
     * Get rules
     * @type {*}
     */
    const rules = this.getConfig('rules'),
        uuid = subscriber.model.getUUID();

    rules.subscribers = rules.subscribers || {};
    rules.subscribers[event] = rules.subscribers[event] || [];

    if ($.inArray(uuid, rules.subscribers[event]) === -1) {
      rules.subscribers[event].push(uuid);
    }
  }

  /**
   * Set widget input-radio preferences
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setRadioPreferences(eventName) {
    if (typeof(this[eventName]) === 'function') {
      this[eventName](eventName);
    } else {
      this.scope.logger.warn('Undefined event', eventName);
    }
  }

  /**
   * Set layer (radio)
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setLayer(eventName) {
    this.setRadioPreferences(eventName);
  }

  /**
   * Set stick (radio)
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStick(eventName) {
    this.setRadioPreferences(eventName);
  }

  /**
   * Set stretch width
   * Adopt to container width
   * @memberOf WidgetModel
   * @param {boolean} stretch
   */
  setStretchWidth(stretch) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;
    this._setItemInfoPreferences('stretchWidth', stretch);
    scope.observer.publish(scope.eventManager.eventList.stretchWidth, stretch);
  }

  /**
   * Set stretch height
   * Adopt to container height
   * @memberOf WidgetModel
   * @param {boolean} stretch
   */
  setStretchHeight(stretch) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;
    this._setItemInfoPreferences('stretchHeight', stretch);
    scope.observer.publish(scope.eventManager.eventList.stretchHeight, stretch);
  }

  /**
   * Set stick to
   * @param {string} eventName
   * @memberOf WidgetModel
   * @returns {boolean}
   * @private
   */
  _setStickTo(eventName) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList[eventName]);
  }

  /**
   * Unset stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  unsetStick(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Set on top
   * @memberOf WidgetModel
   * @param {boolean} ontop
   */
  setAlwaysOnTop(ontop) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;
    this.scope.config.preferences.alwaysOnTop = ontop;
    scope.observer.publish(scope.eventManager.eventList.setAlwaysOnTop, ontop);
  }

  /**
   * Save widget layer
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setLayerUp(eventName) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList[eventName], false);
  }

  /**
   * Save widget layer
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setLayerDown(eventName) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList[eventName], false);
  }

  /**
   * Set overlapping
   * @memberOf WidgetModel
   * @param {boolean} overlapping
   */
  setOverlapping(overlapping) {
    this._setItemInfoPreferences('overlapping', overlapping);
  }

  /**
   * Set on click Url
   * @memberOf WidgetModel
   * @param {string} url
   */
  setOnClickOpenUrl(url) {
    this._setItemInfoPreferences('onClickOpenUrl', url);

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.setOnClickUrl, url);
  }

  /**
   * Set statistics
   * @memberOf WidgetModel
   * @param {boolean} statistics
   */
  setStatistics(statistics) {
    this._setItemInfoPreferences('statistics', statistics);
  }

  /**
   * Set maximizable
   * @memberOf WidgetModel
   * @param {boolean} maximizable
   */
  setMaximizable(maximizable) {
    this._setItemInfoPreferences('maximizable', maximizable);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;
    if (!maximizable) {
      scope.observer.publish(scope.eventManager.eventList.reduceWidget);
    }
  }

  /**
   * Set zoomable
   * @memberOf WidgetModel
   * @param {boolean} zoomable
   */
  setZoomable(zoomable) {
    this._setItemInfoPreferences('zoomable', zoomable);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;
    const eventName = (zoomable ? '' : 'un') + 'setZoomable';
    scope.observer.publish(scope.eventManager.eventList[eventName]);
  }

  /**
   * Set draggable
   * @memberOf WidgetModel
   * @param {boolean} draggable
   */
  setDraggable(draggable) {
    this._setItemInfoPreferences('draggable', draggable);
  }

  /**
   * Set resizable
   * @memberOf WidgetModel
   * @param {boolean} resizable
   */
  setResizable(resizable) {
    this._setItemInfoPreferences('resizable', resizable);
  }

  /**
   * Set freeze
   * @memberOf WidgetModel
   * @param {boolean} freeze
   */
  setFreeze(freeze) {
    this._setItemInfoPreferences('freeze', freeze);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.toggleFreeze, freeze);
  }

  /**
   * Set expandable
   * @memberOf WidgetModel
   * @param {boolean} expandable
   */
  setExpandable(expandable) {
    this._setItemInfoPreferences('expandable', expandable);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.toggleContentExpander, expandable);
  }

  /**
   * Set scrollable
   * @memberOf WidgetModel
   * @param {boolean} scrollable
   */
  setScrollable(scrollable) {
    this._setItemInfoPreferences('scrollable', scrollable);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.scrollContent, scrollable);
  }

  /**
   * Set commentable
   * @memberOf WidgetModel
   * @param {boolean} commentable
   */
  setCommentable(commentable) {
    this._setItemInfoPreferences('commentable', commentable);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.commentableContent, commentable);
  }

  /**
   * Set custom class name
   * @memberOf WidgetModel
   * @param {string} name
   */
  setCustomClassName(name) {

    /**
     * Get current class name
     * @type {string}
     */
    const currentClassName = this.getConfig('preferences').customClassName;
    this._setItemInfoPreferences('customClassName', name);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.customClassName, [name, currentClassName]);
  }

  /**
   * Set scroll speed behavior
   * @memberOf WidgetModel
   * @param {number} speed
   */
  setScrollSpeed(speed) {
    this._setItemInfoPreferences('scrollSpeed', speed);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.scrollSpeedParallaxBehavior, speed);
  }

  /**
   * Set hide Content On Drag
   * @memberOf WidgetModel
   * @param {boolean} hide
   */
  setHideContentOnDrag(hide) {
    this._setItemInfoPreferences('hideContentOnDrag', hide);
  }

  /**
   * Set hide Content On resize
   * @memberOf WidgetModel
   * @param {boolean} hide
   */
  setHideContentOnResize(hide) {
    this._setItemInfoPreferences('hideContentOnResize', hide);
  }

  /**
   * Set outline to page containment
   * @memberOf WidgetModel
   * @param {boolean} outline
   */
  setPageContainment(outline) {
    this._setItemInfoPreferences('pageContainment', outline);

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope,
        page = scope.controller.getContainment();

    const containment = outline ? false : page.view.get$item().$;
    scope.observer.publish(scope.eventManager.eventList.updateContainment, [['draggable', 'resizable'], containment]);
  }
}