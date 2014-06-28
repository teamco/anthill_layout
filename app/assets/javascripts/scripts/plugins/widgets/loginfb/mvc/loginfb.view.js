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
    'plugins/widgets/loginfb/element/loginfb.element',
    'plugins/widgets/loginfb/element/loginfb.preferences.element',
    'plugins/widgets/loginfb/element/loginfb.rules.element'
], function defineLoginfbView(BaseView, Header, Footer, LoginfbElement, LoginfbPreferencesElement, LoginfbRulesElement) {

    /**
     * Define view
     * @class LoginfbView
     * @extends BaseView
     * @constructor
     */
    var LoginfbView = function LoginfbView() {
    };

    return LoginfbView.extend('LoginfbView', {

        /**
         * Render loginfb element
         * @member LoginfbView
         */
        renderLoginfb: function renderLoginfb() {

            this.header(Header, this.elements.$container);

            /**
             * Define $loginfb
             * @type {LoginfbElement}
             */
            this.elements.$loginfb = new LoginfbElement(this, {
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
         * @member LoginfbView
         * @returns {LoginfbPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Loginfb Preferences Element
             * @type {LoginfbPreferencesElement}
             */
            this.elements.$preferences = new LoginfbPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member LoginfbView
         * @param widgetRules
         * @param contentRules
         * @returns {LoginfbRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Loginfb Rules Element
             * @type {LoginfbRulesElement}
             */
            this.elements.$rules = new LoginfbRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render loginfb
         * @member LoginfbView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLoginfb.bind(this)
            );
        }

    }, BaseView.prototype)

});