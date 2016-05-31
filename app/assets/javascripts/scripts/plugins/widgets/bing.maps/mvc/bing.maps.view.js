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
    'plugins/widgets/bing.maps/element/bing.maps.element',
    'plugins/widgets/bing.maps/element/bing.maps.preferences.element',
    'plugins/widgets/bing.maps/element/bing.maps.rules.element'
], function defineBingMapsView(BaseView, Header, Footer, BingMapsElement, BingMapsPreferencesElement, BingMapsRulesElement) {

    /**
     * Define view
     * @class BingMapsView
     * @extends BaseView
     * @constructor
     */
    var BingMapsView = function BingMapsView() {
    };

    return BingMapsView.extend('BingMapsView', {

        /**
         * Render BingMaps element
         * @memberOf BingMapsView
         */
        renderBingMaps: function renderBingMaps() {

            this.header(Header, this.get$container());

            /**
             * Define $bingmaps
             * @type {BingMapsElement}
             */
            this.elements.$bingmaps = new BingMapsElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf BingMapsView
         * @returns {BingMapsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define BingMaps Preferences Element
             * @type {BingMapsPreferencesElement}
             */
            this.elements.$preferences = new BingMapsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf BingMapsView
         * @param widgetRules
         * @param contentRules
         * @returns {BingMapsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define BingMaps Rules Element
             * @type {BingMapsRulesElement}
             */
            this.elements.$rules = new BingMapsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render BingMaps
         * @memberOf BingMapsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderBingMaps.bind(this)
            );
        }

    }, BaseView.prototype);
});
