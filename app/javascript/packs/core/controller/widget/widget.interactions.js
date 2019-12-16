/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/22/14
 * Time: 9:25 PM
 */

/**
 * @class WidgetInteractions
 * @type {WidgetInteractions}
 */
export class WidgetInteractions {

  /**
   * Validate interaction config
   * @memberOf WidgetInteractions
   * @param {string} type
   * @param config
   * @returns {*}
   */
  validateInteractionConfig(type, config) {

    /**
     * Get widget
     * @type {Widget}
     */
    const scope = this.scope;

    if (typeof scope.view.get$item().$[type] !== 'function') {
      scope.logger.warn('Unable to define', type, config);
      return false;
    }

    if (config.containment) {
      scope.logger.warn('Check containment', config);
      config.containment = 'parent';
    }

    return config;
  }

  /**
   * Setup interactions {Drag|Resize}
   * @memberOf WidgetInteractions
   */
  setupInteractions() {
    const scope = this.scope,
        observer = scope.observer,
        eventList = scope.eventManager.eventList;

    observer.publish(eventList.initDraggable);
    observer.publish(eventList.initResizable);
  }

  /**
   * Set Interaction
   * @memberOf WidgetInteractions
   * @param {WidgetResize|WidgetDrag|Droppable|{name}} InteractionEvent
   * @returns {*}
   */
  setInteraction(InteractionEvent) {

    /**
     * Event name
     * @type {string}
     */
    const ename = InteractionEvent.name.toLowerCase();

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.scope;

    /**
     * Register interactions
     * @type {WidgetDrag|WidgetResize|Droppable}
     */
    scope.interactions[ename] = new InteractionEvent(scope);

    return this.getInteraction(ename);
  }

  /**
   * Get Interaction
   * @memberOf WidgetInteractions
   * @param {string} event
   * @returns {*}
   */
  getInteraction(event) {
    return this.scope.interactions[event];
  }

  /**
   * Init drag
   * @memberOf WidgetInteractions
   */
  initDraggable() {

    /**
     * @constant WidgetDrag
     * @type {WidgetDrag}
     */
    const module = require('./widget.drag.js');
    this.controller.setInteraction(module.WidgetDrag);
  }

  /**
   * Enable drag
   * @memberOf WidgetInteractions
   */
  enableDraggable() {
    this.interactions.widgetdrag.enable();
  }

  /**
   * Disable drag
   * @memberOf WidgetInteractions
   */
  disableDraggable() {
    this.interactions.widgetdrag.disable();
  }

  /**
   * Destroy drag
   * @memberOf WidgetInteractions
   */
  destroyDraggable() {
    this.interactions.widgetdrag.destroy();
  }

  /**
   * Init resize
   * @memberOf WidgetInteractions
   */
  initResizable() {

    /**
     * @constant WidgetResize
     * @type {WidgetResize}
     */
    const module = require('./widget.resize.js');
    this.controller.setInteraction(module.WidgetResize);
  }

  /**
   * Enable resize
   * @memberOf WidgetInteractions
   */
  enableResizable() {
    this.interactions.widgetresize.enable();
  }

  /**
   * Disable resize
   * @memberOf WidgetInteractions
   */
  disableResizable() {
    this.interactions.widgetresize.disable();
  }

  /**
   * Destroy resize
   * @memberOf WidgetInteractions
   */
  destroyResizable() {
    this.interactions.widgetresize.destroy();
  }

  /**
   * Debug interactions
   * @memberOf WidgetInteractions
   * @param {string} interaction
   */
  debugInteractions(interaction) {
    this.logger.debug('Debug interactions', interaction);
  }

  /**
   * Create drag
   * @memberOf WidgetInteractions
   */
  createDraggable() {
    this.logger.debug('Create drag', arguments);
  }

  /**
   * Start drag
   * @memberOf WidgetInteractions
   */
  startDraggable() {
    this.logger.debug('Start drag', arguments);
  }

  /**
   * Grid sticker on drag
   * @memberOf WidgetInteractions
   * @param {string} type
   */
  dragDraggable(type) {
    this.logger.debug('On drag', arguments);
    this.map.selectOverlappedWidgets();
    this.controller.behaviorMode(this.controller.getInteractionConfig('ongoing'), type);
  }

  /**
   * Stop drag
   * @memberOf WidgetInteractions
   * @param {string} type
   */
  stopDraggable(type) {
    this.logger.debug('Stop drag', arguments);
    this.map.unSelectOverlappedWidgets();
    this.controller.behaviorMode(this.controller.getInteractionConfig('stop'), type);
  }

  /**
   * Create resize
   * @memberOf WidgetInteractions
   */
  createResizable() {
    this.logger.debug('Create resize', arguments);
  }

  /**
   * Resize start
   * @memberOf WidgetInteractions
   */
  startResizable() {
    this.logger.debug('Start resize', arguments);
  }

  /**
   * Grid sticker on resize
   * @memberOf WidgetInteractions
   * @param {string} type
   */
  resizeResizable(type) {
    this.logger.debug('On resize', arguments);
    this.map.selectOverlappedWidgets();
    this.controller.behaviorMode(this.controller.getInteractionConfig('ongoing'), type);
  }

  /**
   * Resize stop
   * @memberOf WidgetInteractions
   * @param {string} type
   * @param {*} [opts]
   */
  stopResizable(type, opts) {
    this.logger.debug('Stop resize', arguments);
    this.map.unSelectOverlappedWidgets();

    /**
     * Define opts
     * @type {*}
     */
    opts = opts || {};

    /**
     * Define controller
     * @type {WidgetController}
     */
    const controller = this.controller;

    /**
     * Get config
     * @type {{organize: boolean, animate: Boolean, callback?: Function, $source}}
     */
    const config = controller.getInteractionConfig('stop');

    /**
     * Define organize
     * @type {boolean}
     */
    config.organize = this.utils.setBoolean(opts.organize, config.organize);

    /**
     * Define animate
     * @type {boolean}
     */
    config.animate = this.utils.setBoolean(opts.animate, config.animate);

    controller.behaviorMode(config, type);
  }

  /**
   * Update WidgetResize
   * @memberOf WidgetInteractions
   * @param key
   * @param value
   */
  updateResizable(key, value) {
    this.updateInteractions('resizable', key, value);
  }

  /**
   * Update WidgetDrag
   * @memberOf WidgetInteractions
   * @param key
   * @param value
   */
  updateDraggable(key, value) {
    this.updateInteractions('draggable', key, value);
  }

  /**
   * Update interactions
   * @memberOf WidgetInteractions
   * @param type
   * @param key
   * @param value
   */
  updateInteractions(type, key, value) {
    this.scope.view.get$item().$[type]('option', key, value);
  }

  /**
   * Check if widget is draggable
   * @memberOf WidgetInteractions
   * @returns {Boolean}
   */
  isDraggable() {
    return this.scope.view.get$item().$.is('.ui-draggable');
  }

  /**
   * Check if widget is resizable
   * @memberOf WidgetInteractions
   * @returns {Boolean}
   */
  isResizable() {
    return this.scope.view.get$item().$.is('.ui-resizable');
  }

  /**
   * Transfer click to content
   * @memberOf WidgetInteractions
   * @param {string} url
   */
  setOnClickUrl(url) {
    if (url.length > 0) {
      this.view.get$item().bindOnClickOpenUrl(url);
    }
  }

  /**
   * Update page dims on stop|drag/resize
   * @memberOf WidgetInteractions
   */
  updateContainmentDimensions() {

    /**
     * Get Page
     * @type {Page}
     */
    const page = this.getContainment();

    page.observer.publish(page.eventManager.eventList.updateHeight);
  }

  /**
   * Define update containment
   * @memberOf WidgetInteractions
   * @param {array} types
   * @param {boolean|string|*} containment
   */
  updateContainment(types, containment) {
    if (this.controller.isConsumptionMode()) {
      this.logger.debug('Skip update interaction containment in consumption mode', types, containment);
      return false;
    }

    let i = 0, l = types.length;
    for (; i < l; i++) {

      // Get type
      const type = types[i];

      // Get interaction
      const interaction = this.interactions[type],
          checkInteraction = this.controller['is' + type.capitalize()];

      if (interaction) {
        if (checkInteraction && checkInteraction.bind(this.controller)()) {

          // Update interaction
          interaction.$scope[type]('option', 'containment', containment);

          // Update config
          this.config.events[type].containment = !!containment;
        } else {
          this.logger.warn('Undefined interaction', types[i]);
        }
      }
    }
    this.logger.debug('Update interaction containment', types, containment);
  }
}