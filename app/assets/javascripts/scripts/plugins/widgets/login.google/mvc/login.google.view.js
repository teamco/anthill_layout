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
    'plugins/widgets/login.google/element/login.google.element',
    'plugins/widgets/login.google/element/login.google.preferences.element',
    'plugins/widgets/login.google/element/login.google.rules.element'
], function defineLoginGoogleView(BaseView, Header, Footer, LoginGoogleElement, LoginGooglePreferencesElement, LoginGoogleRulesElement) {

    /**
     * Define view
     * @class LoginGoogleView
     * @extends BaseView
     * @constructor
     */
    var LoginGoogleView = function LoginGoogleView() {
    };

    return LoginGoogleView.extend('LoginGoogleView', {

        /**
         * Render login.google element
         * @memberOf LoginGoogleView
         */
        renderLoginGoogle: function renderLoginGoogle() {

            this.header(Header, this.get$container());

            /**
             * Define $login.google
             * @type {LoginGoogleElement}
             */
            this.elements.$logingoogle = new LoginGoogleElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf LoginGoogleView
         * @returns {LoginGooglePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define LoginGoogle Preferences Element
             * @type {LoginGooglePreferencesElement}
             */
            this.elements.$preferences = new LoginGooglePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf LoginGoogleView
         * @param widgetRules
         * @param contentRules
         * @returns {LoginGoogleRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define LoginGoogle Rules Element
             * @type {LoginGoogleRulesElement}
             */
            this.elements.$rules = new LoginGoogleRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render login.google
         * @memberOf LoginGoogleView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLoginGoogle.bind(this)
            );
        }

    }, BaseView.prototype)

});