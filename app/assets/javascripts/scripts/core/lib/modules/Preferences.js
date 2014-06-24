/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:23 PM
 */

define([], function defineBasePreferences(){

    var BasePreferences = function BasePreferences() {

    };

    return BasePreferences.extend('BasePreferences', {

        /**
         * Update prefs
         * @member BasePreferences
         * @param {ModalElement} $modal
         * @param {boolean} render
         */
        updatePreferences: function updatePreferences($modal, render) {

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

            if (render) {
                scope.view['render' + scope.constructor.name]();
            }

            $modal.selfDestroy();

            this.store();
        }
    });
});