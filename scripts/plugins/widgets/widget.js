/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

define([

], function defineWidgetControllerBase() {

    var WidgetController = function WidgetController() {

    };

    return WidgetController.extend({

        /**
         * Init widget
         */
        initWidget: function initWidget() {

            this.observer.publish(
                this.eventmanager.eventList.successCreated
            );

            this.observer.publish(
                this.eventmanager.eventList.defineContainer
            );

            this.observer.publish(
                this.eventmanager.eventList.updateTranslations, [
                    'plugins/widgets/',
                    this.constructor.name.toLowerCase(),
                    '/translations/en-us'
                ].join('')
            );

            this.view.render();
        },

        /**
         * Define container
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
         * @returns {{}}
         */
        getPreferences: function getPreferences() {

            return this.model.preferences;
        },

        /**
         * Update prefs
         * @param $input
         */
        updatePreferences: function updatePreferences($modal) {

            var $inputs = $('input', $modal.$);

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

                if (typeof(setter) === 'function') {

                    /**
                     * Define input value
                     * @type {*|jQuery}
                     */
                    value = input.value;

                    this.model[setter](value);

                    this.scope.observer.publish(
                        this.scope.eventmanager.eventList.transferPreferences,
                        [input.name, value]
                    );

                } else {

                    this.logger.error('Undefined setter', [name, setter]);
                }

            }.bind(this));

            this.scope.view['render' + this.constructor.name]();

            $modal.selfDestroy();

            this.store();
        },

        /**
         * Transfer preferences to containment
         * @param index
         * @param value
         */
        transferPreferences: function transferPreferences(index, value) {

            /**
             * Define widget
             * @type {*}
             */
            var widget =this.controller.getContainment();

            /**
             * Define prefs
             * @type {{}}
             */
            var prefs = {};

            prefs[index] = value;
            widget.model.updatePreferences(prefs);
        }

    });

});