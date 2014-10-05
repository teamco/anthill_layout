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
    'plugins/widgets/google.plus/element/google.plus.element',
    'plugins/widgets/google.plus/element/google.plus.preferences.element',
    'plugins/widgets/google.plus/element/google.plus.rules.element'
], function defineGooglePlusView(BaseView, Header, Footer, GooglePlusElement, GooglePlusPreferencesElement, GooglePlusRulesElement) {

    /**
     * Define view
     * @class GooglePlusView
     * @extends BaseView
     * @constructor
     */
    var GooglePlusView = function GooglePlusView() {
    };

    return GooglePlusView.extend('GooglePlusView', {

        /**
         * Render GooglePlus element
         * @member GooglePlusView
         */
        renderGooglePlus: function renderGooglePlus() {

            this.header(Header, this.elements.$container);

            /**
             * Define $googleplus
             * @type {GooglePlusElement}
             */
            this.elements.$googleplus = new GooglePlusElement(this, {
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
         * @member GooglePlusView
         * @returns {GooglePlusPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define GooglePlus Preferences Element
             * @type {GooglePlusPreferencesElement}
             */
            this.elements.$preferences = new GooglePlusPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member GooglePlusView
         * @param widgetRules
         * @param contentRules
         * @returns {GooglePlusRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define GooglePlus Rules Element
             * @type {GooglePlusRulesElement}
             */
            this.elements.$rules = new GooglePlusRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render GooglePlus
         * @member GooglePlusView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGooglePlus.bind(this)
            );
        }

    }, BaseView.prototype)

});
