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
     * @extends AntHill
     */
    var WidgetContentModel = function WidgetContentModel() {

        /**
         * Define prefs
         * @property WidgetContentModel
         * @type {undefined}
         */
        this.preferences = undefined;

        /**
         * Define scope
         * @property WidgetContentModel
         * @type {undefined}
         */
        this.scope = undefined;
    };

    return WidgetContentModel.extend('WidgetContentModel', {

        /**
         * Get prefs
         * @memberOf WidgetContentModel
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
         * Get all content preferences
         * @memberOf WidgetContentModel
         * @returns {*}
         */
        getAllContentPrefs: function getAllContentPrefs() {
            return this.preferences;
        },

        /**
         * Get prefs
         * @memberOf WidgetContentModel
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
         * @memberOf WidgetContentModel
         * @param {string} prefs
         * @param {*} value
         */
        setPrefs: function setPrefs(prefs, value) {

            /**
             * Define preferences
             * @memberOf WidgetContentModel
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
         * Set prefs
         * @memberOf WidgetContentModel
         * @param prefs
         * @param value
         */
        setPrefsCache: function setPrefsCache(prefs, value) {

            if (this.getPrefs(prefs) !== value) {

                this.setPrefs(prefs, value);
            }
        },

        /**
         * Copy prefs
         * @memberOf WidgetContentModel
         * @param source
         * @returns {boolean}
         */
        copyPrefs: function copyPrefs(source) {

            /**
             * Define
             * @type {string}
             */
            var cname = this.scope.name.toLowerCase(),
                prefs = source.model.preferences;

            if (source.name.toLowerCase() !== cname) {
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
        },

        /**
         * Define type setter
         * @memberOf WidgetContentModel
         * @param {string} type
         */
        setMetamorphicType: function setMetamorphicType(type) {

            /**
             * Get scope
             * @type {WidgetContent|{name}}
             */
            var scope = this.scope;

            var isMetamorphic = true,
                widget = scope.controller.getContainment();

            if (scope.name.toLowerCase() !== 'metamorphic') {
                isMetamorphic = scope.view.get$container().$.hasClass('metamorphic');
            }
            
            isMetamorphic ?
                this.setPrefs('metamorphicType', type):
                widget.model._setItemInfoPreferences('metamorphicType', type);

            scope.observer.publish(
                scope.eventmanager.eventList.fetchMetamorphicPreferences,
                type
            );
        },

        /**
         * Get Metamorphic Preferences
         * @memberOf WidgetContentModel
         * @param {boolean} force
         * @returns {{}}
         */
        getMetamorphicPreferences: function getMetamorphicPreferences(force) {

            var allowed = false, type;

            if (force) {

                /**
                 * Get widget
                 * @type {Widget}
                 */
                var widget = this.scope.controller.getContainment();

                // Get prefs
                var prefs = widget.model.getConfig('preferences');

                allowed = prefs.metamorphicAllowChangeContent;
                type = prefs.metamorphicType;
            }

            return {
                metamorphicAllowChangeContent: {
                    type: 'checkbox',
                    disabled: false,
                    value: allowed,
                    visible: true
                },
                metamorphicType: {
                    type: 'listbox',
                    disabled: false,
                    list: [],
                    visible: true,
                    label: true,
                    value: type
                }
            }
        }
    });
});