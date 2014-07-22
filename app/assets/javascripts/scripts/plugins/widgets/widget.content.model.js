/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/29/14
 * Time: 1:09 AM
 */

define([], function defineWidgetContentModel() {

    /**
     * Define Widget content model
     * @class WidgetContentModel
     * @constructor
     */
    var WidgetContentModel = function WidgetContentModel() {

    };

    return WidgetContentModel.extend('WidgetContentModel', {


        /**
         * Get prefs
         * @member WidgetContentModel
         * @param {string} prefs
         * @returns {boolean|string}
         */
        getContentPrefs: function getContentPrefs(prefs) {

            if (!this.preferences[prefs]) {
                this.scope.logger.info('Undefined preference', prefs);
                return false;
            }

            return this.preferences[prefs].value;
        },

        /**
         * Get prefs
         * @member WidgetContentModel
         * @param {string} prefs
         * @returns {*}
         */
        getPrefs: function getPrefs(prefs) {

            if (this.base.isDefined(this.preferences)) {
                return this.getContentPrefs(prefs);
            }

            /**
             * Define prefs
             * @type {{}}
             */
            var preferences = this.scope.config.preferences;

            if (!preferences) {
                this.scope.logger.warn('Unable to locate preference', prefs);
                return false;
            }

            return preferences[prefs];
        },

        /**
         * Set prefs
         * @member WidgetContentModel
         * @param {string} prefs
         * @param {*} value
         */
        setPrefs: function setPrefs(prefs, value) {

            /**
             * Define preferences
             * @member WidgetContentModel
             * @type {*}
             */
            this.preferences = this.base.define(
                this.preferences, {}, true
            );

            /**
             * Define new prefs
             * @type {*}
             */
            this.preferences[prefs] = this.base.define(
                this.preferences[prefs], {}, true
            );

            /**
             * Define prefs
             * @type {string}
             */
            this.preferences[prefs].value = value;
        },

        /**
         * Copy prefs
         * @member WidgetContentModel
         * @param source
         * @returns {boolean}
         */
        copyPrefs: function copyPrefs(source) {

            /**
             * Define
             * @type {string}
             */
            var cname = this.scope.constructor.name.toLowerCase(),
                prefs = source.model.preferences;

            if (source.constructor.name.toLowerCase() !== cname) {
                this.scope.logger.warn('Unable to copy preferences', source);
                return false;
            }

            for (var index in prefs) {

                if (prefs.hasOwnProperty(index)) {

                    if (index.match(new RegExp(cname))) {

                        this.setPrefs(index, prefs[index].value);
                        this.scope.logger.debug(
                            'Copied prefs', source, index, prefs[index]
                        );
                    }
                }
            }
        }
    });
});