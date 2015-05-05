/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:26 PM
 */

define([], function defineWidgetContentPreferencesController() {

    var WidgetContentPreferencesController = function WidgetContentPreferencesController() {

    };

    return WidgetContentPreferencesController.extend('WidgetContentPreferencesController', {

        /**
         * Load prefs
         * @memberOf WidgetContentPreferencesController
         */
        loadPreferences: function loadPreferences() {

            /**
             * Load prefs
             * @type {*}
             */
            var widget = this.controller.getContainment(),
                globalPrefs = widget.model.getConfig('preferences'),
                localPrefs = this.model.preferences || {},
                index, value;

            for (index in localPrefs) {

                if (localPrefs.hasOwnProperty(index) &&
                    globalPrefs.hasOwnProperty(index)) {

                    value = globalPrefs[index];

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
                widget.eventManager.eventList.transferPreferences,
                [index, value]
            );
        }
    });
});