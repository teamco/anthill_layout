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
    'plugins/widgets/arcgis/element/arcgis.element',
    'plugins/widgets/arcgis/element/arcgis.preferences.element',
    'plugins/widgets/arcgis/element/arcgis.rules.element'
], function defineArcgisView(BaseView, Header, Footer, ArcgisElement, ArcgisPreferencesElement, ArcgisRulesElement) {

    /**
     * Define view
     * @class ArcgisView
     * @extends BaseView
     * @constructor
     */
    var ArcgisView = function ArcgisView() {
    };

    return ArcgisView.extend('ArcgisView', {

        /**
         * Render Arcgis element
         * @memberOf ArcgisView
         */
        renderArcgis: function renderArcgis() {

            this.header(Header, this.get$container());

            /**
             * Define $arcgis
             * @type {ArcgisElement}
             */
            this.elements.$arcgis = new ArcgisElement(this, {
                $container: this.get$container().$,
                id: true
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ArcgisView
         * @returns {ArcgisPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Arcgis Preferences Element
             * @type {ArcgisPreferencesElement}
             */
            this.elements.$preferences = new ArcgisPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf ArcgisView
         * @param widgetRules
         * @param contentRules
         * @returns {ArcgisRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Arcgis Rules Element
             * @type {ArcgisRulesElement}
             */
            this.elements.$rules = new ArcgisRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Arcgis
         * @memberOf ArcgisView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderArcgis.bind(this)
            );
        }

    }, BaseView.prototype);
});
