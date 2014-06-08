/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/geolocation/element/geolocation.element',
    'plugins/widgets/geolocation/element/geolocation.preferences.element',
    'plugins/widgets/geolocation/element/geolocation.rules.element'
], function defineGeolocationView(BaseView, Header, Footer, GeolocationElement, GeolocationPreferencesElement, GeolocationRulesElement) {

    /**
     * Define view
     * @class GeolocationView
     * @extends BaseView
     * @constructor
     */
    var GeolocationView = function GeolocationView() {
    };

    return GeolocationView.extend('GeolocationView', {

        /**
         * Render geolocation element
         * @member GeolocationView
         */
        renderGeolocation: function renderGeolocation() {

            this.header(Header, this.elements.$container);

            /**
             * Define $geolocation
             * @type {GeolocationElement}
             */
            this.elements.$geolocation = new GeolocationElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.showPosition();
        },

        /**
         * Render Prefs
         * @member GeolocationView
         * @returns {GeolocationPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Geolocation Preferences Element
             * @type {GeolocationPreferencesElement}
             */
            this.elements.$preferences = new GeolocationPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member GeolocationView
         * @param widgetRules
         * @param contentRules
         * @returns {GeolocationRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Geolocation Rules Element
             * @type {GeolocationRulesElement}
             */
            this.elements.$rules = new GeolocationRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Show position
         * @member GeolocationView
         */
        showPosition: function showPosition() {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render geolocation
         * @member GeolocationView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGeolocation.bind(this)
            );
        }

    }, BaseView.prototype)

});