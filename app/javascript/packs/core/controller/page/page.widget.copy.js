/**
 * Created with RubyMine.
 * User: teamco
 * Date: 4/6/15
 * Time: 7:43 PM
 */

/**
 * Define PageWidgetCopy
 * @class PageWidgetCopy
 */
module.exports = class PageWidgetCopy {

  /**
   * Define clone widgets from other page
   * @memberOf PageWidgetCopy
   * @param {Page} fromPage
   */
  cloneWidgets(fromPage) {

    /**
     * Get clone page items
     * @type {Object}
     */
    const cloneWidgets = fromPage.model.getItems();
    let cloneMap = {};

    for (let index in cloneWidgets) {
      if (cloneWidgets.hasOwnProperty(index)) {

        /**
         * Get updated clone map
         * @type {Object}
         */
        cloneMap = this.cloneWidget(cloneWidgets[index], cloneMap);
      }
    }
    this.defineWidgetsRules(cloneMap);
  }

  /**
   * Define clone widget
   * @memberOf PageWidgetCopy
   * @param {Widget} cloneWidget
   * @param {Object} cloneMap
   * @returns {Object}
   */
  cloneWidget(cloneWidget, cloneMap) {
    this.scope.logger.debug('Clone widget', arguments);

    // Get prefs
    const cloneWidgetPrefs = $.extend(true, {}, cloneWidget.model.getConfig('preferences'));
    if (!cloneWidgetPrefs.resource) {
      cloneWidget.logger.warn('Undefined resource', cloneWidgetPrefs);
      return false;
    }

    // Create without render
    this.createWidgetFromResource({
      resource: cloneWidgetPrefs.resource,
      thumbnail: cloneWidgetPrefs.thumbnail,
      title: cloneWidgetPrefs.title,
      description: cloneWidgetPrefs.description,
      width: cloneWidget.dom.width,
      height: cloneWidget.dom.height
    }, false, true);

    /**
     * Get current widget
     * @type {Widget}
     */
    const currentWidget = this.model.getCurrentItem();

    // Define map
    cloneMap[cloneWidget.model.getUUID()] = currentWidget.model.getUUID();

    // Copy dom
    currentWidget.dom = $.extend(true, {}, cloneWidget.dom);

    // Render widget
    currentWidget.observer.publish(currentWidget.eventManager.eventList.successRendered);

    // Copy prefs
    currentWidget.config.preferences = cloneWidgetPrefs;

    // Temporary clone rules
    currentWidget.config.rules = $.extend(true, {}, cloneWidget.model.getConfig('rules'));
    return cloneMap;
  }

  /**
   * Define widget rules
   * @memberOf PageWidgetCopy
   * @param cloneMap
   */
  defineWidgetsRules(cloneMap) {

    // Get all page widgets
    const items = this.model.getItems();

    for (let item in items) {
      if (items.hasOwnProperty(item)) {
        this.defineWidgetRules(items[item], cloneMap);
      }
    }
  }

  /**
   * Define widget rules
   * @memberOf PageWidgetCopy
   * @param {Widget} currentWidget
   * @param {Array} cloneMap
   */
  defineWidgetRules(currentWidget, cloneMap) {
    this.scope.logger.debug('Define widget rules', arguments);
    this._copyWidgetRulesSubscribe(currentWidget, cloneMap);
    this._copyWidgetRulesSubscribers(currentWidget, cloneMap);
  }

  /**
   * Define copy widget rules subscribe
   * @memberOf PageWidgetCopy
   * @param {Widget} widget
   * @param {Object} cloneMap
   * @private
   */
  _copyWidgetRulesSubscribe(widget, cloneMap) {

    // Get widget rules
    const rules = widget.model.getConfig('rules');

    /**
     * Get subscribed widgets
     * @type {Object}
     */
    let subscribe = rules.subscribe || {},
        rs, currentKey, z = 0,
        removeSubscribe = [];

    if (!subscribe) {
      this.scope.logger.debug('Undefined subscribe', rules);
      return false;
    }

    for (rs in subscribe) {
      if (subscribe.hasOwnProperty(rs)) {

        // Get current key
        currentKey = cloneMap[rs];
        if (rs.match(/content/)) {

          // Get content key
          currentKey = cloneMap[rs.replace(/\-content/, '')] + '-content';
        }

        subscribe[currentKey] = {};

        for (let sk in subscribe[rs]) {
          if (subscribe[rs].hasOwnProperty(sk)) {

            // Define subscribe array
            subscribe[currentKey][sk] = subscribe[currentKey][sk] || [];

            for (; z < subscribe[rs][sk].length; z++) {

              // Fill subscribe
              subscribe[currentKey][sk].push(subscribe[rs][sk][z]);
            }
          }
        }

        // Collect temp rules
        removeSubscribe.push(rs);
      }
    }

    const sl = removeSubscribe.length;

    for (z = 0; z < sl; z++) {

      // Delete temp rules
      delete subscribe[removeSubscribe[z]];
    }
  }

  /**
   * Define copy widget rules subscribers
   * @memberOf PageWidgetCopy
   * @param {Widget} widget
   * @param {Object} cloneMap
   * @private
   */
  _copyWidgetRulesSubscribers(
      widget,
      cloneMap) {

    // Get widget rules
    const rules = widget.model.getConfig('rules');

    /**
     * Get widget subscribers
     * @type {Object}
     */
    let subscribers = rules.subscribers || {},
        rs, ssk = 0;

    for (rs in subscribers) {
      if (subscribers.hasOwnProperty(rs)) {

        // Get subscribers array of items
        const subscribersItems = subscribers[rs] || [];

        for (; ssk < subscribersItems.length; ssk++) {

          // Set cloned key
          subscribersItems[ssk] = cloneMap[subscribersItems[ssk]];
        }
      }
    }
  }
};
