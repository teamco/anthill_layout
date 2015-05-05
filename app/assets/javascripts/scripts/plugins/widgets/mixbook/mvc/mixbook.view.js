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
    'plugins/widgets/mixbook/element/mixbook.element',
    'plugins/widgets/mixbook/element/mixbook.preferences.element',
    'plugins/widgets/mixbook/element/mixbook.rules.element'
], function defineMixbookView(BaseView, Header, Footer, MixbookElement, MixbookPreferencesElement, MixbookRulesElement) {

    /**
     * Define view
     * @class MixbookView
     * @extends BaseView
     * @constructor
     */
    var MixbookView = function MixbookView() {
    };

    return MixbookView.extend('MixbookView', {

        /**
         * Render mixbook element
         * @memberOf MixbookView
         */
        renderMixbook: function renderMixbook() {

            this.header(Header, this.elements.$container);

            /**
             * Define $mixbook
             * @type {MixbookElement}
             */
            this.elements.$mixbook = new MixbookElement(this, {
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
         * @memberOf MixbookView
         * @returns {MixbookPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Mixbook Preferences Element
             * @type {MixbookPreferencesElement}
             */
            this.elements.$preferences = new MixbookPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf MixbookView
         * @param widgetRules
         * @param contentRules
         * @returns {MixbookRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Mixbook Rules Element
             * @type {MixbookRulesElement}
             */
            this.elements.$rules = new MixbookRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render mixbook
         * @memberOf MixbookView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderMixbook.bind(this)
            );
        }

    }, BaseView.prototype)

});
