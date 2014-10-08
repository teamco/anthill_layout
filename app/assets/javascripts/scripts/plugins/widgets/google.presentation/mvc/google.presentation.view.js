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
    'plugins/widgets/google.presentation/element/google.presentation.element',
    'plugins/widgets/google.presentation/element/google.presentation.preferences.element',
    'plugins/widgets/google.presentation/element/google.presentation.rules.element'
], function defineGooglePresentationView(BaseView, Header, Footer, GooglePresentationElement, GooglePresentationPreferencesElement, GooglePresentationRulesElement) {

    /**
     * Define view
     * @class GooglePresentationView
     * @extends BaseView
     * @constructor
     */
    var GooglePresentationView = function GooglePresentationView() {
    };

    return GooglePresentationView.extend('GooglePresentationView', {

        /**
         * Render GooglePresentation element
         * @member GooglePresentationView
         */
        renderGooglePresentation: function renderGooglePresentation() {

            this.header(Header, this.elements.$container);

            /**
             * Define $googlepresentation
             * @type {GooglePresentationElement}
             */
            this.elements.$googlepresentation = new GooglePresentationElement(this, {
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
         * @member GooglePresentationView
         * @returns {GooglePresentationPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define GooglePresentation Preferences Element
             * @type {GooglePresentationPreferencesElement}
             */
            this.elements.$preferences = new GooglePresentationPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member GooglePresentationView
         * @param widgetRules
         * @param contentRules
         * @returns {GooglePresentationRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define GooglePresentation Rules Element
             * @type {GooglePresentationRulesElement}
             */
            this.elements.$rules = new GooglePresentationRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render GooglePresentation
         * @member GooglePresentationView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderGooglePresentation.bind(this)
            );
        }

    }, BaseView.prototype)

});
