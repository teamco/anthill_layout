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
    'plugins/widgets/truba/element/truba.element',
    'plugins/widgets/truba/element/truba.preferences.element',
    'plugins/widgets/truba/element/truba.rules.element'
], function defineTrubaView(BaseView, Header, Footer, TrubaElement, TrubaPreferencesElement, TrubaRulesElement) {

    /**
     * Define view
     * @class TrubaView
     * @extends BaseView
     * @constructor
     */
    var TrubaView = function TrubaView() {
    };

    return TrubaView.extend('TrubaView', {

        /**
         * Render truba element
         * @memberOf TrubaView
         */
        renderTruba: function renderTruba() {

            this.header(Header, this.elements.$container);

            /**
             * Define $truba
             * @type {TrubaElement}
             */
            this.elements.$truba = new TrubaElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventManager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf TrubaView
         * @returns {TrubaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Truba Preferences Element
             * @type {TrubaPreferencesElement}
             */
            this.elements.$preferences = new TrubaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf TrubaView
         * @param widgetRules
         * @param contentRules
         * @returns {TrubaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Truba Rules Element
             * @type {TrubaRulesElement}
             */
            this.elements.$rules = new TrubaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render truba
         * @memberOf TrubaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderTruba.bind(this)
            );
        }

    }, BaseView.prototype)

});
