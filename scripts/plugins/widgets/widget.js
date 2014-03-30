/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

define([

], function defineWidgetContentControllerBase() {

    /**
     * Define Base Widget controller
     * @class WidgetContentController
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

            this.observer.publish(
                this.eventmanager.eventList.loadPreferences
            );

            this.observer.publish(
                this.eventmanager.eventList.successCreated
            );

            this.observer.publish(
                this.eventmanager.eventList.defineContainer
            );

            this.observer.publish(
                this.eventmanager.eventList.updateTranslations, [
                    'plugins/widgets/',
                    this.constructor.name.toPoint().replace(/./, ''),
                    '/translations/en-us'
                ].join('')
            );

            this.view.render();
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
         * Update prefs
         * @member WidgetContentController
         * @param {ModalElement} $modal
         */
        updatePreferences: function updatePreferences($modal) {

            var $inputs = $('input:not(:disabled), textarea', $modal.$),
                scope = this.scope;

            $inputs.each(function each(index, input) {

                /**
                 * Transform input name
                 * @type {string|jQuery}
                 */
                var name = input.name.toCamel().capitalize();

                /**
                 * Define method name
                 * @type {string}
                 */
                var setter = 'set' + name,
                    value;

                if (typeof(this.model[setter]) === 'function') {

                    /**
                     * Define input value
                     * @type {*|jQuery}
                     */
                    value = input.value;

                    this.model[setter](value);

                    scope.observer.publish(
                        scope.eventmanager.eventList.transferPreferences,
                        [input.name, value]
                    );

                } else {

                    scope.logger.error('Undefined setter', [name, setter]);
                }

            }.bind(this));

            scope.view['render' + scope.constructor.name]();

            $modal.selfDestroy();

            this.store();
        },

        /**
         * Update prefs
         * @member WidgetContentController
         * @param {ModalElement} $modal
         */
        updateRules: function updateRules($modal) {

            var published = $('ul.publish-rules li', $modal.$),
                event, events = {
                    publish: {
                        widget: []
                    }
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

            scope.observer.publish(
                scope.eventmanager.eventList.transferRules,
                events
            );

            $modal.selfDestroy();

            this.store();
        },

        /**
         * Load prefs
         * @member WidgetContentController
         */
        loadPreferences: function loadPreferences() {

            /**
             * Load prefs
             * @type {*}
             */
            var widget = this.controller.getContainment(),
                prefs = widget.model.getConfig('preferences');

            $.each(prefs, function each(index, value) {

                /**
                 * Define method name
                 * @type {string}
                 */
                var setter = 'set' + index.toCamel().capitalize();

                if (typeof(this.model[setter]) === 'function') {

                    this.model[setter](value);

                } else {

                    this.logger.debug('Skip', setter);
                }

            }.bind(this));
        },

        /**
         * Load rules
         * @member WidgetContentController
         */
        loadRules: function loadRules() {

            /**
             * Load prefs
             * @type {*}
             */
            var widget = this.controller.getContainment(),
                rules = widget.model.getConfig('rules');

            $.each(rules, function each(index, value) {

                /**
                 * Define method name
                 * @type {string}
                 */
                var setter = 'set' + index.toCamel().capitalize();

                if (typeof(this.model[setter]) === 'function') {

                    this.model[setter](value);

                } else {

                    this.logger.debug('Skip', setter);
                }

            }.bind(this));
        },

        /**
         * Transfer preferences to containment
         * @member WidgetContentController
         * @param index
         * @param value
         */
        transferPreferences: function transferPreferences(index, value) {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.controller.getContainment();

            /**
             * Define prefs
             * @type {{}}
             */
            var prefs = {};

            prefs[index] = value;
            widget.model.updatePreferences(prefs);
        },

        /**
         * Transfer rules to containment
         * @member WidgetContentController
         * @param rules
         */
        transferRules: function transferRules(rules) {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.controller.getContainment();

            widget.model.updateRules(rules);
        },

        /**
         * Add widget rule
         * @member WidgetContentController
         * @param e
         */
        addWidgetRule: function addWidgetRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            this.publishRule(
                $button.attr('value'),
                'Widget'
            );
        },

        /**
         * Publish rule
         * @member WidgetContentController
         * @param {string} rule
         * @param {string} type
         */
        publishRule: function publishRule(rule, type) {

            /**
             * Define referrer
             * @type {*}
             */
            var referrer = this.scope.referrer;

            this.scope.view.elements.$rules.addRule(
                rule, type,
                referrer.view.elements.$modal.$
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
        }

    });

});