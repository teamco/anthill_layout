/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

import {WidgetSubscribe} from './widget.subscribe';

/**
 * @class WidgetContentControllerRules
 * @extends WidgetSubscribe
 * @type {WidgetContentControllerRules}
 */
export class WidgetContentControllerRules extends WidgetSubscribe {

  /**
   * Define Base Widget controller Rules
   * @class WidgetContentControllerRules
   * @extends BaseController
   * @extends WidgetSubscribe
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Update prefs
   * @memberOf WidgetContentControllerRules
   * @param {ModalElement} $modal
   */
  updateRules($modal) {

    const published = $('ul.publish-rules li', $modal.$),
        subscribed = $('ul.subscribe-rules > li', $modal.$),
        events = {
          publish: {},
          subscribe: {}
        },
        scope = this.scope;

    let event;

    for (let i = 0, l = published.length; i < l; i++) {

      /**
       * Get event
       * @type {Array|jQuery}
       */
      event = $(published[i]).attr('value').split(':');

      events.publish[event[0]] = events.publish[event[0]] || [];
      events.publish[event[0]].push(event[1]);
    }

    for (let i1 = 0, l1 = subscribed.length; i1 < l1; i1++) {
      const $inputs = $('input:checked', subscribed[i1]);

      for (let i2 = 0, l2 = $inputs.length; i2 < l2; i2++) {

        /**
         * Get event
         * @type {Array|jQuery}
         */
        event = $($inputs[i2]).attr('name').split(':');

        /**
         * Get uuid
         * @type {string}
         */
        const uuid = $('legend', subscribed[i1]).attr('data-uuid');
        this.updateEventSubscribes(events, event, uuid);
      }
    }

    scope.observer.publish(scope.eventManager.eventList.transferRules, events);
    $modal.selfDestroy();
    this.store();
  }

  /**
   * Update events are ready to subscribe
   * @memberOf WidgetContentControllerRules
   * @param events
   * @param {Array} event
   * @param {string} uuid
   */
  updateEventSubscribes(events, event, uuid) {
    events.subscribe[uuid] = events.subscribe[uuid] || {};
    events.subscribe[uuid][event[0]] = events.subscribe[uuid][event[0]] || [];
    events.subscribe[uuid][event[0]].push(event[1]);
  }

  /**
   * Load rules
   * @memberOf WidgetContentControllerRules
   */
  loadRules() {

    /**
     * Load rules
     * @type {Widget}
     */
    const widget = this.controller.getContainment(),
        rules = widget.model.getConfig('rules');

    this.model.setRules(rules);
    this.logger.debug('Load rules', rules);
    this.observer.publish(this.eventManager.eventList.registerRules);
  }

  /**
   * Get Published rules
   * @memberOf WidgetContentControllerRules
   * @returns {{}}
   */
  getPublishedRules() {

    /**
     * Get page
     * @type {Page}
     */
    const page = this.getPage(),
        items = page.model.getItems();
    let item, rules, uuid;

    /**
     * Init published
     * @type {*}
     */
    let published = {};

    for (let index in items) {
      if (!items.hasOwnProperty(index)) {
        continue;
      }

      /**
       * Define page item
       * @type {Widget}
       */
      item = items[index];

      /**
       * Get rules
       * @type {{publish}}
       */
      rules = item.model.getConfig('rules');

      // Get uuid
      uuid = item.controller.getContent().model.getUUID();

      if (rules.hasOwnProperty('publish') && this.scope.model.getUUID() !== uuid) {
        published[uuid] = {
          rules: rules.publish,
          type: item.controller.getContent().name
        };
      }
    }
    return published;
  }

  /**
   * Transfer rules to containment
   * @memberOf WidgetContentControllerRules
   * @param rules
   */
  transferRules(rules) {

    /**
     * Define widget
     * @type {*}
     */
    const widget = this.controller.getContainment();

    widget.model.updateRules(rules);
    this.observer.publish(this.eventManager.eventList.registerRules);
  }

  /**
   * Unregister rules
   * @memberOf WidgetContentControllerRules
   * @return {boolean}
   */
  unregisterRules() {

    /**
     * Define subscriber events
     * @type {*}
     */
    const subscribeEM = this.scope.eventManager.subscribers;

    for (let index in subscribeEM) {
      if (!subscribeEM.hasOwnProperty(index)) {
        continue;
      }

      const events = subscribeEM[index];

      /**
       * Define uuid
       * @type {string}
       */
      let uuid = index;

      // check widget/content uuid
      if (index.split('-').length > 5) {
        uuid = index.substring(0, index.lastIndexOf('-'));
      }

      /**
       * Find item
       * @type {*}
       */
      const item = this.model.findItemByUUID(this.root(), uuid);
      this.scope.logger.debug(item, events);

      if (!item) {
        this.scope.logger.warn('Undefined item', events);
        return false;
      }

      if (!Object.keys(events).length) {
        this.scope.logger.warn('Empty events', subscribeEM, index);
        return false;
      }

      for (let event in events) {
        if (!events.hasOwnProperty(event)) {
          continue;
        }

        for (let i = 0, l = events[event].length; i < l; i++) {
          item.observer.unRegister(event, events[event][i]);
        }

        delete subscribeEM[index][event];

        if (!Object.keys(subscribeEM[index]).length) {
          delete subscribeEM[index];
        }
      }
    }
    return true;
  }

  /**
   * Register rules
   * @memberOf WidgetContentControllerRules
   */
  registerRules() {

    /**
     * Define rules
     * @type {*}
     */
    const rules = this.model.rules || {},
        subscribe = rules.subscribe || {};

    /**
     * Define subscriber events
     * @type {*}
     */
    this.eventManager.subscribers = this.eventManager.subscribers || {};

    /**
     * Copy subscribers
     * @type {*}
     */
    let subscribeEM = {};

    $.extend(true, subscribeEM, this.eventManager.subscribers);

    if (!this.controller.unregisterRules()) {
      return false;
    }

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.controller.getContainment();

    /**
     * Define page
     * @type {Page}
     */
    const page = widget.controller.getContainment();
    let subscribersCounter = Object.keys(subscribe).length;

    for (let index in subscribe) {
      if (!subscribe.hasOwnProperty(index)) {
        continue;
      }

      /**
       * Define types
       * @type {{}}
       */
      const types = subscribe[index];
      subscribersCounter -= 1;

      /**
       * Define widget publisher
       * @type {Widget}
       */
      const widgetPublisher = page.model.getWidgetByContentUUID(index);

      for (let type in types) {
        if (!types.hasOwnProperty(type)) {
          continue;
        }

        for (let i = 0, l = types[type].length; i < l; i++) {

          /**
           * Define event
           * @type {string}
           */
          const event = types[type][i];

          // add rule subscriber
          widgetPublisher.model.setSubscriber(event, widget);

          /**
           * Define opts
           * @type {{
           *  widgetPublisher: Widget,
           *  type: string,
           *  event: *,
           *  subscribeEM: *,
           *  subscribersCounter: Number
           * }}
           */
          const opts = {
            widgetPublisher: widgetPublisher,
            type: type,
            event: event,
            subscribeEM: subscribeEM,
            subscribersCounter: subscribersCounter
          };

          if (type === 'widget') {
            this.controller._registerScopeRule(widgetPublisher, opts);
          } else {

            /**
             * Define widget content scope
             * @type {WidgetContent}
             */
            const scope = widgetPublisher.controller.getContent();

            if (scope) {
              this.controller._registerScopeRule(scope, opts);
            } else {
              this.utils.waitFor(
                  () => opts.widgetPublisher.controller.getContent(),
                  () => this.controller._getContentScope(opts),
                  () => this.logger.warn('Timeout. Unable to register rules')
              );
            }
          }
        }
      }
    }
  }

  /**
   * Get content scope via interval
   * @memberOf WidgetContentControllerRules
   * @param opts
   * @returns {boolean}
   * @private
   */
  _getContentScope(opts) {

    /**
     * Define scope
     * @type {WidgetContent}
     */
    const scope = opts.widgetPublisher.controller.getContent();
    this.logger.info('Scope available', scope);
    this.controller._registerScopeRule(scope, opts);
  }

  /**
   * Register scope rule
   * @memberOf WidgetContentControllerRules
   * @param scope
   * @param opts
   * @returns {boolean}
   * @private
   */
  _registerScopeRule(scope, opts) {
    if (!scope) {
      this.logger.error('Undefined scope', opts.widgetPublisher, type);
      return false;
    }
    this.registerRule(scope, opts.event, opts.subscribeEM, opts.subscribersCounter);
  }

  /**
   * Register rule
   * @memberOf WidgetContentControllerRules
   * @param scope
   * @param {string} event
   * @param subscribeEM
   * @param subscribersCounter
   * @returns {boolean}
   */
  registerRule(scope, event, subscribeEM, subscribersCounter) {

    /**
     * Define event list
     * @type {{}}
     */
    const eventList = scope.eventManager.eventList || {};

    /**
     * Define event name
     * @type {string}
     */
    const ename = event.toCamelCase();
    if (!eventList.hasOwnProperty(ename)) {
      scope.logger.warn('Undefined event', event);
      return false;
    }

    /**
     * Define callback
     * @type {function}
     */
    const callback = this[ename + 'Simulate'];
    if (!callback) {
      this.scope.logger.warn('Undefined callback', event, ename + 'Simulate');
      return false;
    }

    /**
     * Define scope uuid
     * @type {string}
     */
    const sUUID = scope.model.getUUID();
    subscribeEM[sUUID] = subscribeEM[sUUID] || {};

    if (!subscribeEM[sUUID][eventList[ename]]) {

      /**
       * Subscribe to event
       * @type {Array}
       */
      const eventUUIDs = this.scope.eventManager.publishOn({
        scope: scope,
        events: [{eventName: eventList[ename]}],
        callback: callback.bind({
          scope: this.scope,
          referrer: scope,
          subscriber: subscribersCounter
        })
      });

      subscribeEM[sUUID][eventList[ename]] = eventUUIDs;
      scope.logger.debug('Subscribed event', eventUUIDs, subscribeEM[sUUID][eventList[ename]]);
    }
  }

  /**
   * Add widget rule
   * @memberOf WidgetContentControllerRules
   * @param {Event} e
   * @param {string} type
   */
  addWidgetRule(e, type) {

    /**
     * Define $button
     * @type {*|jQuery|HTMLElement}
     */
    let $button = $(e.target);

    if ($button.prop('tagName') !== 'BUTTON') {
      $button = $button.closest('button');
    }

    let scope = this.scope,
        value = $button.attr('value');

    if ((value || '').match(/Select rule \(\d+\)/)) {
      value = undefined;
    }

    scope.observer.publish(scope.eventManager.eventList.publishRule, [value, type || 'Widget']);
  }

  /**
   * Publish rule
   * @memberOf WidgetContentControllerRules
   * @param {string} rule
   * @param {string} type
   */
  publishRule(rule, type) {

    /**
     * Define referrer
     * @type {*}
     */
    const referrer = this.referrer;

    /**
     * Get $rules
     * @type {*}
     */
    const $element = this.view.elements.$rules;

    $element.rules.addRule(rule, type, referrer.view.elements.$modal.get$Body());
  }
}
  