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
    'plugins/widgets/url.widget/element/url.widget.element',
    'plugins/widgets/url.widget/element/url.widget.preferences.element',
    'plugins/widgets/url.widget/element/url.widget.rules.element'
], function defineUrlWidgetView(BaseView, Header, Footer, UrlWidgetElement, UrlWidgetPreferencesElement, UrlWidgetRulesElement) {

    /**
     * Define view
     * @class UrlWidgetView
     * @extends BaseView
     * @constructor
     */
    var UrlWidgetView = function UrlWidgetView() {
    };

    return UrlWidgetView.extend('UrlWidgetView', {

        /**
         * Render UrlWidget element
         * @memberOf UrlWidgetView
         */
        renderUrlWidget: function renderUrlWidget() {

            this.header(Header, this.get$container());

            /**
             * Define $urlwidget
             * @type {UrlWidgetElement}
             */
            this.elements.$urlwidget = new UrlWidgetElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf UrlWidgetView
         * @returns {UrlWidgetPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define UrlWidget Preferences Element
             * @type {UrlWidgetPreferencesElement}
             */
            this.elements.$preferences = new UrlWidgetPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf UrlWidgetView
         * @param widgetRules
         * @param contentRules
         * @returns {UrlWidgetRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define UrlWidget Rules Element
             * @type {UrlWidgetRulesElement}
             */
            this.elements.$rules = new UrlWidgetRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render UrlWidget
         * @memberOf UrlWidgetView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderUrlWidget.bind(this)
            );
        }

    }, BaseView.prototype);
});
