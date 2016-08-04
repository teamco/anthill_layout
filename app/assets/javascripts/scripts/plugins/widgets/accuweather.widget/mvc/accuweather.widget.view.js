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
    'plugins/widgets/accuweather.widget/element/accuweather.widget.element',
    'plugins/widgets/accuweather.widget/element/accuweather.widget.preferences.element',
    'plugins/widgets/accuweather.widget/element/accuweather.widget.rules.element'
], function defineAccuweatherWidgetView(BaseView, Header, Footer, AccuweatherWidgetElement, AccuweatherWidgetPreferencesElement, AccuweatherWidgetRulesElement) {

    /**
     * Define view
     * @class AccuweatherWidgetView
     * @extends BaseView
     * @constructor
     */
    var AccuweatherWidgetView = function AccuweatherWidgetView() {
    };

    return AccuweatherWidgetView.extend('AccuweatherWidgetView', {

        /**
         * Render AccuweatherWidget element
         * @memberOf AccuweatherWidgetView
         */
        renderAccuweatherWidget: function renderAccuweatherWidget() {

            this.header(Header, this.get$container());

            /**
             * Define $accuweatherwidget
             * @type {AccuweatherWidgetElement}
             */
            this.elements.$accuweatherwidget = new AccuweatherWidgetElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf AccuweatherWidgetView
         * @returns {AccuweatherWidgetPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define AccuweatherWidget Preferences Element
             * @type {AccuweatherWidgetPreferencesElement}
             */
            this.elements.$preferences = new AccuweatherWidgetPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf AccuweatherWidgetView
         * @param widgetRules
         * @param contentRules
         * @returns {AccuweatherWidgetRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define AccuweatherWidget Rules Element
             * @type {AccuweatherWidgetRulesElement}
             */
            this.elements.$rules = new AccuweatherWidgetRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render AccuweatherWidget
         * @memberOf AccuweatherWidgetView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderAccuweatherWidget.bind(this)
            );
        }

    }, BaseView.prototype);
});
