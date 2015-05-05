/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/map.locator/element/map.locator.element',
    'plugins/widgets/map.locator/element/map.locator.preferences.element',
    'plugins/widgets/map.locator/element/map.locator.rules.element'
], function defineMapLocatorView(BaseView, Header, Footer, MapLocatorElement, MapLocatorPreferencesElement, MapLocatorRulesElement) {

    /**
     * Define view
     * @class MapLocatorView
     * @extends BaseView
     * @constructor
     */
    var MapLocatorView = function MapLocatorView() {
    };

    return MapLocatorView.extend('MapLocatorView', {

        /**
         * Render map.locator element
         * @memberOf MapLocatorView
         */
        renderMapLocator: function renderMapLocator() {

            this.header(Header, this.elements.$container);

            /**
             * Define $geolocation
             * @type {MapLocatorElement}
             */
            this.elements.$maplocator = new MapLocatorElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.showPosition();
        },

        /**
         * Render Prefs
         * @memberOf MapLocatorView
         * @returns {MapLocatorPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define MapLocator Preferences Element
             * @type {MapLocatorPreferencesElement}
             */
            this.elements.$preferences = new MapLocatorPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf MapLocatorView
         * @param widgetRules
         * @param contentRules
         * @returns {MapLocatorRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define MapLocator Rules Element
             * @type {MapLocatorRulesElement}
             */
            this.elements.$rules = new MapLocatorRulesElement(this, {
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
         * @memberOf MapLocatorView
         */
        showPosition: function showPosition() {
            this.scope.observer.publish(
                this.scope.eventManager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render map.locator
         * @memberOf MapLocatorView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderMapLocator.bind(this)
            );
        }

    }, BaseView.prototype)

});