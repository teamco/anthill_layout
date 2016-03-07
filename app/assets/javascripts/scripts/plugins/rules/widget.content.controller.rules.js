/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

define([
    'plugins/rules/widget.subscribe'
], function defineWidgetContentControllerRulesBase(WidgetSubscribe) {

    /**
     * Define Base Widget controller Rules
     * @class WidgetContentControllerRules
     * @extends WidgetSubscribe
     * @constructor
     */
    var WidgetContentControllerRules = function WidgetContentControllerRules() {
    };

    return WidgetContentControllerRules.extend('WidgetContentControllerRules', {

        /**
         * Update prefs
         * @memberOf WidgetContentControllerRules
         * @param {ModalElement} $modal
         */
        updateRules: function updateRules($modal) {

            var published = $('ul.publish-rules li', $modal.$),
                subscribed = $('ul.subscribe-rules > li', $modal.$),
                event, events = {
                    publish: {},
                    subscribe: {}
                },
                scope = this.scope;

            for (var i = 0, l = published.length; i < l; i++) {

                /**
                 * Get event
                 * @type {Array|jQuery}
                 */
                event = $(published[i]).attr('value').split(':');

                events.publish[event[0]] = this.base.define(events.publish[event[0]], [], true);
                events.publish[event[0]].push(event[1]);
            }

            for (var i1 = 0, l1 = subscribed.length; i1 < l1; i1++) {

                var $inputs = $('input:checked', subscribed[i1]);

                for (var i2 = 0, l2 = $inputs.length; i2 < l2; i2++) {

                    /**
                     * Get event
                     * @type {Array|jQuery}
                     */
                    event = $($inputs[i2]).attr('name').split(':');

                    /**
                     * Get uuid
                     * @type {string}
                     */
                    var uuid = $('legend', subscribed[i1]).attr('title');

                    this.updateEventSubscribes(events, event, uuid);
                }
            }

            scope.observer.publish(
                scope.eventmanager.eventList.transferRules,
                events
            );

            $modal.selfDestroy();

            this.store();
        },

        /**
         * Update events are ready to subscribe
         * @memberOf WidgetContentControllerRules
         * @param events
         * @param {Array} event
         * @param {string} uuid
         */
        updateEventSubscribes: function updateEventSubscribes(events, event, uuid) {

            events.subscribe[uuid] = this.base.define(
                events.subscribe[uuid], {}, true
            );

            events.subscribe[uuid][event[0]] = this.base.define(
                events.subscribe[uuid][event[0]], [], true
            );

            events.subscribe[uuid][event[0]].push(event[1]);
        },

        /**
         * Load rules
         * @memberOf WidgetContentControllerRules
         */
        loadRules: function loadRules() {

            /**
             * Load rules
             * @type {Widget}
             */
            var widget = this.controller.getContainment(),
                rules = widget.model.getConfig('rules');

            this.model.setRules(rules);
            this.logger.debug('Load rules', rules);

            this.observer.publish(
                this.eventmanager.eventList.registerRules
            );
        },

        /**
         * Get Published rules
         * @memberOf WidgetContentControllerRules
         * @returns {{}}
         */
        getPublishedRules: function getPublishedRules() {

            /**
             * Get page
             * @type {Page}
             */
            var page = this.getPage(),
                items = page.model.getItems(),
                item, rules, uuid;

            /**
             * Init published
             * @type {*}
             */
            var published = {};

            for (var index in items) {

                if (!items.hasOwnProperty(index)) {
                    continue;
                }

                /**
                 * Define page item
                 * @type {Widget}
                 */
                item = items[index];

                rules = item.model.getConfig('rules');
                uuid = item.controller.getContent().model.getUUID();

                if (rules.hasOwnProperty('publish') &&
                    this.scope.model.getUUID() !== uuid) {
                    published[uuid] = {
                        rules: rules.publish,
                        type: item.controller.getContent().name
                    };
                }
            }

            return published;
        },

        /**
         * Transfer rules to containment
         * @memberOf WidgetContentControllerRules
         * @param rules
         */
        transferRules: function transferRules(rules) {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.controller.getContainment();

            widget.model.updateRules(rules);

            this.observer.publish(
                this.eventmanager.eventList.registerRules
            );
        },

        /**
         * Unregister rules
         * @memberOf WidgetContentControllerRules
         * @return {boolean}
         */
        unregisterRules: function unregisterRules() {

            /**
             * Define subscriber events
             * @type {*}
             */
            var subscribeEM = this.scope.eventmanager.subscribers;

            for (var index in subscribeEM) {

                if (!subscribeEM.hasOwnProperty(index)) {
                    continue;
                }

                var events = subscribeEM[index];

                /**
                 * Define uuid
                 * @type {string}
                 */
                var uuid = index;

                // check widget/content uuid
                if (index.split('-').length > 5) {
                    uuid = index.substring(0, index.lastIndexOf('-'));
                }

                /**
                 * Find item
                 * @type {*}
                 */
                var item = this.model.findItemByUUID(this.root(), uuid);

                this.scope.logger.debug(item, events);

                if (!item) {
                    this.scope.logger.warn('Undefined item', events);
                    return false;
                }

                if (this.base.lib.hash.hashLength(events) === 0) {
                    this.scope.logger.warn('Empty events', subscribeEM, index);
                    return false;
                }

                for (var event in events) {

                    if (!events.hasOwnProperty(event)) {
                        continue;
                    }

                    for (var i = 0, l = events[event].length; i < l; i++) {
                        item.observer.unRegister(
                            event,
                            events[event][i]
                        );
                    }

                    delete subscribeEM[index][event];

                    if (this.base.lib.hash.hashLength(subscribeEM[index]) === 0) {
                        delete subscribeEM[index];
                    }
                }
            }

            return true;
        },

        /**
         * Register rules
         * @memberOf WidgetContentControllerRules
         */
        registerRules: function registerRules() {

            /**
             * Define rules
             * @type {*}
             */
            var rules = this.model.rules || {},
                subscribe = rules.subscribe || {},
                types, event, scope;

            /**
             * Define subscriber events
             * @type {*}
             */
            this.eventmanager.subscribers = this.base.define(
                this.eventmanager.subscribers, {}, true
            );

            /**
             * Copy subscribers
             * @type {*}
             */
            var subscribeEM = {};

            $.extend(
                true,
                subscribeEM,
                this.eventmanager.subscribers
            );

            if (!this.controller.unregisterRules()) {
                return false;
            }

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = this.controller.getContainment();

            /**
             * Define page
             * @type {Page}
             */
            var page = widget.controller.getContainment(),
                subscribersCounter = this.base.lib.hash.hashLength(subscribe);

            for (var index in subscribe) {

                if (!subscribe.hasOwnProperty(index)) {
                    continue;
                }

                /**
                 * Define types
                 * @type {{}}
                 */
                types = subscribe[index];

                subscribersCounter -= 1;

                /**
                 * Define widget publisher
                 * @type {Widget}
                 */
                var widgetPublisher = page.model.getWidgetByContentUUID(
                    index
                );

                for (var type in types) {

                    if (!types.hasOwnProperty(type)) {
                        continue;
                    }

                    for (var i = 0, l = types[type].length; i < l; i++) {

                        /**
                         * Define event
                         * @type {string}
                         */
                        event = types[type][i];

                        // add rule subscriber
                        widgetPublisher.model.setSubscriber(event, widget);

                        /**
                         * Define opts
                         * @type {{
                         *      widgetPublisher: Widget,
                         *      type: string,
                         *      event: *,
                         *      subscribeEM: *,
                         *      subscribersCounter: Number
                         * }}
                         */
                        var opts = {
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
                            scope = widgetPublisher.controller.getContent();

                            if (this.base.isDefined(scope)) {
                                return this.controller._registerScopeRule(scope, opts);
                            }

                            /**
                             * Get publisher uuid
                             * @type {String}
                             */
                            var puuid = widgetPublisher.model.getUUID(),
                                interval = 100;

                            this[puuid] = setInterval(
                                function () {

                                    this.scope.controller._getContentScope(
                                        this.interval,
                                        this.opts
                                    );

                                }.bind({
                                        scope: this,
                                        interval: interval,
                                        opts: opts
                                    }),

                                interval
                            );
                        }
                    }
                }
            }
        },

        /**
         * Get content scope via interval
         * @memberOf WidgetContentControllerRules
         * @param interval
         * @param opts
         * @returns {boolean}
         * @private
         */
        _getContentScope: function _getContentScope(interval, opts) {

            /**
             * Define timeout
             * @type {number}
             */
            var timeout = 30000;

            /**
             * Get publisher uuid
             * @type {String}
             */
            var puuid = opts.widgetPublisher.model.getUUID();

            if (this.scope[puuid] * interval > timeout) {

                this.scope.logger.warn(
                    'Timeout on loading scope rules',
                    opts.widgetPublisher
                );

                return false;
            }

            /**
             * Define scope
             * @type {WidgetContent}
             */
            var scope = opts.widgetPublisher.controller.getContent();

            this.scope.logger.debug(
                'Wait until scope will be available',
                scope
            );

            if (scope) {

                this.scope.logger.info('Scope available', scope);
                clearInterval(this.scope[puuid]);

                this._registerScopeRule(scope, opts);
            }
        },

        /**
         * Register scope rule
         * @memberOf WidgetContentControllerRules
         * @param scope
         * @param opts
         * @returns {boolean}
         * @private
         */
        _registerScopeRule: function _registerScopeRule(scope, opts) {

            if (!this.base.isDefined(scope)) {

                this.logger.error('Undefined scope', opts.widgetPublisher, type);
                return false;
            }

            this.registerRule(
                scope,
                opts.event,
                opts.subscribeEM,
                opts.subscribersCounter
            );
        },

        /**
         * Register rule
         * @memberOf WidgetContentControllerRules
         * @param scope
         * @param subscribeEM
         * @param subscribersCounter
         * @returns {boolean}
         */
        registerRule: function registerRule(scope, event, subscribeEM, subscribersCounter) {

            /**
             * Define event list
             * @type {{}}
             */
            var eventList = scope.eventmanager.eventList || {};

            /**
             * Define event name
             * @type {String}
             */
            var ename = event.toCamel();

            if (!eventList.hasOwnProperty(ename)) {

                scope.logger.warn('Undefined event', event);
                return false;
            }

            /**
             * Define callback
             * @type {function}
             */
            var callback = this[ename + 'Simulate'];

            if (!_.isFunction(callback)) {

                this.scope.logger.warn(
                    'Undefined callback',
                    event, ename + 'Simulate'
                );

                return false;
            }

            /**
             * Define scope uuid
             * @type {String}
             */
            var sUUID = scope.model.getUUID();

            subscribeEM[sUUID] = this.base.define(
                subscribeEM[sUUID], {}, true
            );

            if (subscribeEM[sUUID][eventList[ename]]) {

                scope.logger.warn(
                    'Duplicate event',
                    subscribeEM[sUUID],
                    eventList[ename]
                );

            } else {

                /**
                 * Subscribe to event
                 * @type {Array}
                 */
                var eventUUIDs = this.scope.eventmanager.publishOn({
                    scope: scope,
                    events: [
                        {eventName: eventList[ename]}
                    ],
                    callback: callback.bind({
                        scope: this.scope,
                        referrer: scope,
                        subscriber: subscribersCounter
                    })
                });

                subscribeEM[sUUID][eventList[ename]] = eventUUIDs;
            }
        },

        /**
         * Add widget rule
         * @memberOf WidgetContentControllerRules
         * @param e
         */
        addWidgetRule: function addWidgetRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), 'Widget']
            );
        },

        /**
         * Publish rule
         * @memberOf WidgetContentControllerRules
         * @param {string} rule
         * @param {string} type
         */
        publishRule: function publishRule(rule, type) {

            /**
             * Define referrer
             * @type {*}
             */
            var referrer = this.referrer;

            /**
             * Get $rules
             * @type {*}
             */
            var $rules = this.view.elements.$rules;

            $rules.addRule(
                rule, type,
                referrer.view.elements.$modal.get$Body()
            );
        }

    }, WidgetSubscribe.prototype);
});