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
                scope = this.scope,
                widget = this.getContainment(),
                cname = scope.constructor.name.toLowerCase();

            /**
             * Validate setter
             * @param {{model, setter, name, value, type}} opts
             * @private
             */
            function _validateSetter(opts) {

                /**
                 * Define setter as a function
                 * @type {function}
                 */
                var setter = opts.model[opts.setter];

                if (typeof(setter) !== 'function') {

                    if (opts.type !== 'radio' || (opts.type === 'radio' && opts.setter !== 'on')) {

                        opts.model.scope.logger.warn('Undefined model setter', opts);
                    }

                } else {

                    setter.bind(opts.model)(
                        opts.value
                    );

                    scope.observer.publish(
                        opts.event,
                        [opts.name, opts.value]
                    );

                }
            }

            $inputs.each(function each(index, input) {

                /**
                 * Check if prefs in content
                 * @type {boolean}
                 */
                var isContentPrefs = input.parentNode.className.indexOf(cname) !== -1;

                var event = isContentPrefs ?
                    scope.eventmanager.eventList.transferContentPreferences :
                    widget.eventmanager.eventList.transferPreferences;

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


                console.log(isContentPrefs, $('legend', $(input).parents('fieldset')).text(), setter, event, value)

                _validateSetter({
                    type: input.type,
                    name: input.name,
                    model: isContentPrefs ?
                        this.model : widget.model,
                    setter: setter,
                    event: event,
                    value: value
                });

            }.bind(this));

            if (render) {
                scope.view['render' + this.scope.constructor.name]();
            }

            $modal.selfDestroy();

            this.store();
        }
    });
});