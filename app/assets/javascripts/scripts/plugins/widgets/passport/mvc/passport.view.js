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
    'plugins/widgets/passport/element/passport.element',
    'plugins/widgets/passport/element/passport.preferences.element',
    'plugins/widgets/passport/element/passport.rules.element'
], function definePassportView(BaseView, Header, Footer, PassportElement, PassportPreferencesElement, PassportRulesElement) {

    /**
     * Define view
     * @class PassportView
     * @extends BaseView
     * @constructor
     */
    var PassportView = function PassportView() {
    };

    return PassportView.extend('PassportView', {

        /**
         * Render passport element
         * @member PassportView
         */
        renderPassport: function renderPassport() {

            this.header(Header, this.elements.$container);

            /**
             * Define $passport
             * @type {PassportElement}
             */
            this.elements.$passport = new PassportElement(this, {
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
         * @member PassportView
         * @returns {PassportPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Passport Preferences Element
             * @type {PassportPreferencesElement}
             */
            this.elements.$preferences = new PassportPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PassportView
         * @param widgetRules
         * @param contentRules
         * @returns {PassportRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Passport Rules Element
             * @type {PassportRulesElement}
             */
            this.elements.$rules = new PassportRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render passport
         * @member PassportView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPassport.bind(this)
            );
        }

    }, BaseView.prototype)

});