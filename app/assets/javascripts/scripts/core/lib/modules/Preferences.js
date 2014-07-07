/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:23 PM
 */

define([], function defineBasePreferences() {

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
                isWidgetContent = this.scope.controller.isWidgetContent(),
                event = isWidgetContent ?
                    this.scope.eventmanager.eventList.transferContentPreferences :
                    this.scope.eventmanager.eventList.transferPreferences;

            $inputs.each(function each(index, input) {

                var isContentPrefs =
                        $('legend', $(input).parents('fieldset')).text() ===
                        this.scope.constructor.name.toLowerCase();

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

                /**
                 * Check if setter is function
                 * @type {boolean}
                 */
                var isSetter = typeof(this.model[setter]) === 'function';

                if (isContentPrefs && isSetter) {

                    this.model[setter](value);

                } else if (isContentPrefs && !isSetter) {

                    if (input.type !== 'radio' || (input.type === 'radio' && setter !== 'on')) {

                        this.scope.logger.warn('Undefined content model setter', [name, setter]);
                        return false;
                    }
                }

                this.scope.observer.publish(
                    event,
                    [input.name, value]
                );

            }.bind(this));

            if (render) {
                this.scope.view['render' + this.scope.constructor.name]();
            }

            $modal.selfDestroy();

            this.store();
        }
    });
});