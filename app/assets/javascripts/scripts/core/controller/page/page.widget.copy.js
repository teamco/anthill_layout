/**
 * Created with RubyMine.
 * User: teamco
 * Date: 4/6/15
 * Time: 7:43 PM
 */

define(function definePageWidgetCopy() {

    /**
     * Define PageWidgetCopy
     * @class PageWidgetCopy
     * @constructor
     */
    var PageWidgetCopy = function PageWidgetCopy() {
    };

    return PageWidgetCopy.extend(
        'PageWidgetCopy', {

            /**
             * Define clone widgets from other page
             * @member PageWidgetCopy
             * @param {Page} fromPage
             */
            cloneWidgets: function cloneWidgets(fromPage) {

                /**
                 * Get clone page items
                 * @type {{Widget: {}}}
                 */
                var cloneWidgets = fromPage.model.getItems(),
                    index, cloneMap = {};

                for (index in cloneWidgets) {

                    if (cloneWidgets.hasOwnProperty(index)) {

                        /**
                         * Get updated clone map
                         * @type {Object}
                         */
                        cloneMap = this.cloneWidget(
                            cloneWidgets[index], cloneMap
                        );
                    }
                }

                this.defineWidgetsRules(cloneMap);
            },

            /**
             * Define clone widget
             * @member PageWidgetCopy
             * @param {Widget} cloneWidget
             * @param {Object} cloneMap
             * @returns {Object}
             */
            cloneWidget: function cloneWidget(cloneWidget, cloneMap) {

                this.scope.logger.debug('Clone widget', arguments);

                // Get prefs
                var cloneWidgetPrefs = $.extend({}, cloneWidget.model.getConfig('preferences'));

                if (typeof(cloneWidgetPrefs.resource) === 'undefined') {

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
                var currentWidget = this.model.getCurrentItem();

                // Define map
                cloneMap[cloneWidget.model.getUUID()] = currentWidget.model.getUUID();

                // Copy dom
                currentWidget.dom = $.extend({}, cloneWidget.dom);

                // Render widget
                currentWidget.observer.publish(
                    currentWidget.eventmanager.eventList.successRendered
                );

                // Copy prefs
                currentWidget.config.preferences = cloneWidgetPrefs;

                // Temporary clone rules
                currentWidget.config.rules = $.extend({}, cloneWidget.model.getConfig('rules'));

                return cloneMap;
            },

            /**
             * Define widget rules
             * @member PageWidgetCopy
             * @param {Object} cloneMap
             */
            defineWidgetsRules: function defineWidgetsRules(cloneMap) {

                // Get all page widgets
                var items = this.model.getItems();

                for (var item in items) {

                    if (items.hasOwnProperty(item)) {

                        this.defineWidgetRules(items[item], cloneMap);
                    }
                }
            },

            /**
             * Define widget rules
             * @member PageWidgetCopy
             * @param {Widget} currentWidget
             * @param {Array} cloneMap
             */
            defineWidgetRules: function defineWidgetRules(currentWidget, cloneMap) {

                this.scope.logger.debug('Define widget rules', arguments);

                this._copyWidgetRulesSubscribe(currentWidget, cloneMap);
                this._copyWidgetRulesSubscribers(currentWidget, cloneMap);
            },

            /**
             * Define copy widget rules subscribe
             * @member PageWidgetCopy
             * @param {Widget} widget
             * @param {Object} cloneMap
             * @private
             */
            _copyWidgetRulesSubscribe: function _copyWidgetRulesSubscribe(widget, cloneMap) {

                // Get widget rules
                var rules = widget.model.getConfig('rules');

                /**
                 * Get subscribed widgets
                 * @type {Object}
                 */
                var subscribe = rules.subscribe || {},
                    rs, currentKey, z = 0,
                    removeSubscribe = [];

                if (typeof(subscribe) === 'undefined') {

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

                        for (var sk in subscribe[rs]) {

                            if (subscribe[rs].hasOwnProperty(sk)) {

                                // Define subscribe array
                                subscribe[currentKey][sk] = subscribe[currentKey][sk] || [];

                                for (; z < subscribe[rs][sk].length; z++) {

                                    // Fill subscribe
                                    subscribe[currentKey][sk].push(
                                        subscribe[rs][sk][z]
                                    );
                                }
                            }
                        }

                        // Collect temp rules
                        removeSubscribe.push(rs);
                    }
                }

                var sl = removeSubscribe.length;

                for (z = 0; z < sl; z++) {

                    // Delete temp rules
                    delete subscribe[removeSubscribe[z]];
                }
            },

            /**
             * Define copy widget rules subscribers
             * @member PageWidgetCopy
             * @param {Widget} widget
             * @param {Object} cloneMap
             * @private
             */
            _copyWidgetRulesSubscribers: function _copyWidgetRulesSubscribers(widget, cloneMap) {

                // Get widget rules
                var rules = widget.model.getConfig('rules');

                /**
                 * Get widget subscribers
                 * @type {Object}
                 */
                var subscribers = rules.subscribers || {},
                    rs, ssk = 0;

                for (rs in subscribers) {

                    if (subscribers.hasOwnProperty(rs)) {

                        // Get subscribers array of items
                        var subscribersItems = subscribers[rs] || [];

                        for (; ssk < subscribersItems.length; ssk++) {

                            // Set cloned key
                            subscribersItems[ssk] = cloneMap[subscribersItems[ssk]];
                        }
                    }
                }
            }
        }
    );
});