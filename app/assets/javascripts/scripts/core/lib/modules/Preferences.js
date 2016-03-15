/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:23 PM
 */

define(function defineBasePreferences() {

    /**
     * Define BasePreferences
     * @class BasePreferences
     * @constructor
     */
    var BasePreferences = function BasePreferences() {

        /**
         * Define scope
         * @property BasePreferences
         * @type {undefined}
         */
        this.scope = undefined;
    };

    return BasePreferences.extend('BasePreferences', {

        /**
         * Update prefs
         * @memberOf BasePreferences
         * @param {ModalElement} $modal
         * @param {boolean} render
         */
        updatePreferences: function updatePreferences($modal, render) {

            var $inputs = $modal.collectInputFields(),
                scope = this.scope,
                containment = this.getContainment(),
                cname = scope.name.toLowerCase();

            if ($inputs.hasClass('validate')) {
                scope.logger.warn('Fix incorrect data before submit');
                return false;
            }

            /**
             * Validate setter
             * @param {{scope, setter, name, value, type}} opts
             * @private
             */
            function _validateSetter(opts) {

                /**
                 * Define callback
                 * @private
                 */
                function _validateCallback() {

                    setter.bind(opts.scope.model)(
                        opts.value
                    );

                    opts.scope.observer.publish(
                        opts.event,
                        [opts.name, opts.value]
                    );
                }

                /**
                 * Define setter as a function
                 * @type {function}
                 */
                var setter = opts.scope.model[opts.setter],
                    name = opts.name;

                if (typeof(setter) !== 'function') {

                    if (opts.type !== 'radio' || (opts.type === 'radio' && opts.setter !== 'on')) {

                        if (name.length > 0) {

                            opts.scope.logger.debug('Undefined model setter', opts);

                            // Toggle method core component <=> widget content
                            var method = opts.scope.controller.isCoreComponent() ?
                                '_setItemInfoPreferences' : 'setPrefs';

                            /**
                             * Define setter
                             * @type {Function}
                             */
                            setter = opts.scope.base.lib.function.create({
                                name: opts.setter,
                                params: name,
                                body: 'this.' + method + '("' + name + '", ' + name + ');',
                                scope: opts.scope.model.constructor.prototype
                            });

                            opts.scope.logger.debug('Define model setter', setter, opts);

                            _validateCallback();

                        } else {

                            opts.scope.logger.debug('Skip model setter', opts);
                        }
                    }

                } else {

                    _validateCallback();
                }
            }

            $inputs.each(function each(index, input) {

                /**
                 * Check if prefs in content
                 * @type {boolean}
                 */
                var isContentPrefs = $(input).closest('[class*="-prefs"]')[0].className.indexOf(cname) !== -1;

                var event = isContentPrefs ?
                    scope.eventmanager.eventList.transferContentPreferences :
                    containment.eventmanager.eventList.transferPreferences;

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

                _validateSetter({
                    type: input.type,
                    name: input.name,
                    setter: setter,
                    event: event,
                    value: value,
                    scope: isContentPrefs ?
                        scope : containment
                });

            }.bind(this));

            if (render) {
                scope.view['render' + this.scope.name]();
            }

            $modal.selfDestroy();

            this.store();
        }
    });
});