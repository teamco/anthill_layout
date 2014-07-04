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
    'plugins/widgets/login.facebook/element/login.facebook.element',
    'plugins/widgets/login.facebook/element/login.facebook.preferences.element',
    'plugins/widgets/login.facebook/element/login.facebook.rules.element'
], function defineLoginFacebookView(BaseView, Header, Footer, LoginFacebookElement, LoginFacebookPreferencesElement, LoginFacebookRulesElement) {

    /**
     * Define view
     * @class LoginFacebookView
     * @extends BaseView
     * @constructor
     */
    var LoginFacebookView = function LoginFacebookView() {
    };

    return LoginFacebookView.extend('LoginFacebookView', {

        /**
         * Render LoginFacebook element
         * @member LoginFacebookView
         */
        renderLoginFacebook: function renderLoginFacebook() {

            this.header(Header, this.elements.$container);

            /**
             * Define $login.facebook
             * @type {LoginFacebookElement}
             */
            this.elements.$loginfacebook = new LoginFacebookElement(this, {
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
         * @member LoginFacebookView
         * @returns {LoginFacebookPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define LoginFacebook Preferences Element
             * @type {LoginFacebookPreferencesElement}
             */
            this.elements.$preferences = new LoginFacebookPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member LoginFacebookView
         * @param widgetRules
         * @param contentRules
         * @returns {LoginFacebookRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define LoginFacebook Rules Element
             * @type {LoginFacebookRulesElement}
             */
            this.elements.$rules = new LoginFacebookRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render login.facebook
         * @member LoginFacebookView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLoginFacebook.bind(this)
            );
        }

    }, BaseView.prototype)

});