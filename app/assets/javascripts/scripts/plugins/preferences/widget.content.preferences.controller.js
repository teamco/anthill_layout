/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:26 PM
 */

define([], function defineWidgetContentPreferencesController(){
   
    var WidgetContentPreferencesController = function WidgetContentPreferencesController() {
        
    };
    
    return WidgetContentPreferencesController.extend('WidgetContentPreferencesController', {

        /**
         * Load prefs
         * @member WidgetContentPreferencesController
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
         * @member WidgetContentPreferencesController
         * @param index
         * @param value
         */
        transferPreferences: function transferPreferences(index, value) {

            /**
             * Define widget
             * @type {Widget}
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