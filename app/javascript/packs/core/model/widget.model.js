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

    this.preferences = {
      defaults: require('./widget/defaults'),
      interactions: require('./widget/interactions'),
      layout: require('./widget/layout'),
      parallax: require('./widget/parallax')
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
    window.$.extend(true, scope.dom, hash);
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
      if (Object.prototype.hasOwnProperty.call(data, index)) {
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

    if (window.$.inArray(uuid, rules.subscribers[event]) === -1) {
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
  setStickToCenterTop(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenter(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterBottom(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToCenterRight(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToTopLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToBottomLeft(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToTopRight(eventName) {
    this._setStickTo(eventName);
  }

  /**
   * Save widget stick
   * @memberOf WidgetModel
   * @param {string} eventName
   */
  setStickToBottomRight(eventName) {
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