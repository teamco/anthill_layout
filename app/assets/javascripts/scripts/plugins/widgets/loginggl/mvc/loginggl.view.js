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
    'plugins/widgets/loginggl/element/loginggl.element',
    'plugins/widgets/loginggl/element/loginggl.preferences.element',
    'plugins/widgets/loginggl/element/loginggl.rules.element'
], function defineLogingglView(BaseView, Header, Footer, LogingglElement, LogingglPreferencesElement, LogingglRulesElement) {

    /**
     * Define view
     * @class LogingglView
     * @extends BaseView
     * @constructor
     */
    var LogingglView = function LogingglView() {
    };

    return LogingglView.extend('LogingglView', {

        /**
         * Render loginggl element
         * @member LogingglView
         */
        renderLoginggl: function renderLoginggl() {

            this.header(Header, this.elements.$container);

            /**
             * Define $loginggl
             * @type {LogingglElement}
             */
            this.elements.$loginggl = new LogingglElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member LogingglView
         * @returns {LogingglPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Loginggl Preferences Element
             * @type {LogingglPreferencesElement}
             */
            this.elements.$preferences = new LogingglPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member LogingglView
         * @param widgetRules
         * @param contentRules
         * @returns {LogingglRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Loginggl Rules Element
             * @type {LogingglRulesElement}
             */
            this.elements.$rules = new LogingglRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render loginggl
         * @member LogingglView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLoginggl.bind(this)
            );
        }

    }, BaseView.prototype)

});