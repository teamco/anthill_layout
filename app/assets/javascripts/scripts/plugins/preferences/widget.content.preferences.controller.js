/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:26 PM
 */

define(function defineWidgetContentPreferencesController() {

    /**
     * Define widget content prefs controller
     * @class WidgetContentPreferencesController
     * @constructor
     * @extends AntHill
     */
    var WidgetContentPreferencesController = function WidgetContentPreferencesController() {
    };

    return WidgetContentPreferencesController.extend(
        'WidgetContentPreferencesController', {

            /**
             * Load prefs
             * @memberOf WidgetContentPreferencesController
             */
            loadPreferences: function loadPreferences() {

                /**
                 * Get widget
                 * @type {Widget|*}
                 */
                var widget = this.controller.getContainment(),
                    globalPrefs = widget.model.getConfig('preferences'),
                    localPrefs = this.model.preferences || {};

                var index, value;

                for (index in localPrefs) {

                    if (localPrefs.hasOwnProperty(index) &&
                        globalPrefs.hasOwnProperty(index)) {

                        value = globalPrefs[index];

                        /**
                         * Define method name
                         * @type {string}
                         */
                        var setter = 'set' + index.toCamel().capitalize();

                        if (typeof(this.model[setter]) !== 'function') {

                            /**
                             * Define setter
                             * @type {Function}
                             */
                            var fn = this.base.lib.function.create({
                                name: setter,
                                params: index,
                                body: 'this.setPrefs("' + index + '", ' + index + ');' + this.controller.getCustomPublisher(index),
                                scope: this.model.constructor.prototype
                            });

                            this.logger.debug('Define model setter', fn, index, setter);
                        }

                        this.model[setter](value);
                    }
                }
            },

            /**
             * Transfer preferences to containment
             * @memberOf WidgetContentPreferencesController
             * @param index
             * @param value
             */
            transferContentPreferences: function transferContentPreferences(index, value) {

                /**
                 * Define widget
                 * @type {Widget}
                 */
                var widget = this.controller.getContainment();

                widget.observer.publish(
                    widget.eventmanager.eventList.transferPreferences,
                    [index, value]
                );
            }
        }
    );
});