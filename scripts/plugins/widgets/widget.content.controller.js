/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

define([
    'plugins/preferences/widget.content.controller.preferences',
    'plugins/rules/widget.content.controller.rules'
], function defineWidgetContentControllerBase(WidgetContentControllerPreferences, WidgetContentControllerRules) {

    /**
     * Define Base Widget controller
     * @class WidgetContentController
     * @extends WidgetContentControllerPreferences
     * @extends WidgetContentControllerRules
     * @constructor
     */
    var WidgetContentController = function WidgetContentController() {

    };

    return WidgetContentController.extend('WidgetContentController', {

            /**
             * Init widget
             * @member WidgetContentController
             */
            initWidget: function initWidget() {

                /**
                 * Define observer
                 * @type {Observer}
                 */
                var observer = this.observer;

                /**
                 * Define event list
                 * @type {*.eventList}
                 */
                var eventList = this.eventmanager.eventList;

                observer.publish(eventList.loadPreferences);
                observer.publish(eventList.loadRules);
                observer.publish(eventList.successCreated);
                observer.publish(eventList.defineContainer);

                observer.publish(
                    eventList.updateTranslations, [
                        'plugins/widgets/',
                        this.constructor.name.toPoint().replace(/./, ''),
                        '/translations/en-us'
                    ].join('')
                );

                this.view.render();
            },

            /**
             * Transfer containment events
             * @member WidgetContentController
             * @param events
             */
            transferEvents: function transferEvents(events) {

                for (var event in events) {

                    if (events.hasOwnProperty(event)) {

                        /**
                         * Define event
                         * @type {*}
                         */
                        var params = events[event];

                        this.logger.debug('Transfer event', event, params);

                        this.observer.publish(
                            this.eventmanager.eventList[event],
                            params
                        );
                    }
                }
            },

            /**
             * Transfer event onClickOpenUrl
             * @member WidgetContentController
             * @param {string} url
             * @returns {boolean}
             */
            onClickOpenUrl: function onClickOpenUrl(url) {

                if (!this.base.isUrl(url) && url.length > 0) {
                    this.logger.warn('None valid url', url);
                    return false;
                }

                if (url.length > 0) {
                    this.view.get$item().bindOnClickOpenUrl(url);
                }
            },

            /**
             * Define referrer
             * @member WidgetContentController
             * @param referrer
             */
            defineReferrer: function defineReferrer(referrer) {
                this.referrer = referrer;
            },

            /**
             * Define container
             * @member WidgetContentController
             */
            defineContainer: function defineContainer() {

                /**
                 * Define widget
                 * @type {*}
                 */
                var widget = this.controller.getContainment();

                /**
                 * Define $container
                 * @type {modules.view.elements.$content|*|element.page.page.element}
                 */
                this.view.elements.$container =
                    widget.view.elements.$content;
            },

            /**
             * Get preferences
             * @member WidgetContentController
             * @returns {{}}
             */
            getPreferences: function getPreferences() {
                return this.model.preferences;
            },

            /**
             * Get rules
             * @member WidgetContentController
             * @returns {{}}
             */
            getRules: function getRules() {
                return this.model.rules;
            },

            /**
             * Clear default thumbnail
             * @member WidgetContentController
             */
            clearParentThumbnail: function clearParentThumbnail() {

                /**
                 * Define widget
                 * @type {Widget}
                 */
                var widget = this.getContainment();

                widget.observer.publish(
                    widget.eventmanager.eventList.clearThumbnail
                );
            },

            /**
             * Get DOM
             * @member WidgetContentController
             * @param type
             * @returns {*}
             */
            getDOMPreferences: function getDOMPreferences(type) {

                /**
                 * Define widget
                 * @type {*}
                 */
                var widget = this.scope.controller.getContainment();

                return (widget.model.getDOM() || {})[type];
            },

            /**
             * Provide statistics before transfer
             * @member WidgetContentController
             * @param e
             */
            provideStats: function provideStats(e) {

                if (!this.model.getPrefs('statistics')) {
                    this.logger.debug('No Statistics available', e);
                    return false;
                }

                /**
                 * Define widget
                 * @type {Widget}
                 * @type {*}
                 */
                var widget = this.controller.getContainment();

                /**
                 * Define uuid
                 * @type {String}
                 */
                var uuid = widget.model.getUUID();

                this.observer.publish(
                    this.eventmanager.eventList.transferStats,
                    [uuid, e.target]
                );
            },

            /**
             * Transfer stats
             * @member WidgetContentController
             * @param {string} uuid
             * @param $element
             */
            transferStats: function transferStats(uuid, $element) {
                this.logger.debug('Transfer Stats', uuid, $element);
            }

        },

        WidgetContentControllerPreferences.prototype,
        WidgetContentControllerRules.prototype
    );
});