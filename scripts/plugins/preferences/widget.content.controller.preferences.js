/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

define([
], function defineWidgetContentControllerPreferencesBase() {

    /**
     * Define Base Widget controller
     * @class WidgetContentControllerPreferences
     * @constructor
     */
    var WidgetContentControllerPreferences = function WidgetContentControllerPreferences() {

    };

    return WidgetContentControllerPreferences.extend('WidgetContentControllerPreferences', {

        /**
         * Update prefs
         * @member WidgetContentControllerPreferences
         * @param {ModalElement} $modal
         */
        updatePreferences: function updatePreferences($modal) {

            var $inputs = $('input:not(:disabled), textarea, div.combo-box > input', $modal.$),
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

                /**
                 * Define input value
                 * @type {string}
                 */
                value = input.value;

                if (input.type === 'checkbox') {
                    value = $(input).prop('checked');
                }

                if (input.type === 'radio') {
                    setter = value;
                }

                if (typeof(this.model[setter]) === 'function') {

                    this.model[setter](value);

                    scope.observer.publish(
                        scope.eventmanager.eventList.transferPreferences,
                        [input.name, value]
                    );

                } else {

                    if (input.type !== 'radio' || (input.type === 'radio' && setter !== 'on')) {

                        scope.logger.warn('Undefined setter', [name, setter]);
                    }
                }

            }.bind(this));

            scope.view['render' + scope.constructor.name]();

            $modal.selfDestroy();

            this.store();
        },

        /**
         * Load prefs
         * @member WidgetContentControllerPreferences
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
         * Transfer preferences to containment
         * @member WidgetContentControllerPreferences
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
        }

    });
});