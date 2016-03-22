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
    'plugins/widgets/embedly/element/embedly.element',
    'plugins/widgets/embedly/element/embedly.preferences.element',
    'plugins/widgets/embedly/element/embedly.rules.element'
], function defineEmbedlyView(BaseView, Header, Footer, EmbedlyElement, EmbedlyPreferencesElement, EmbedlyRulesElement) {

    /**
     * Define view
     * @class EmbedlyView
     * @extends BaseView
     * @constructor
     */
    var EmbedlyView = function EmbedlyView() {
    };

    return EmbedlyView.extend('EmbedlyView', {

        /**
         * Render Embedly element
         * @memberOf EmbedlyView
         */
        renderEmbedly: function renderEmbedly() {

            this.header(Header, this.get$container());

            /**
             * Define $embedly
             * @type {EmbedlyElement}
             */
            this.elements.$embedly = new EmbedlyElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf EmbedlyView
         * @returns {EmbedlyPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Embedly Preferences Element
             * @type {EmbedlyPreferencesElement}
             */
            this.elements.$preferences = new EmbedlyPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf EmbedlyView
         * @param widgetRules
         * @param contentRules
         * @returns {EmbedlyRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Embedly Rules Element
             * @type {EmbedlyRulesElement}
             */
            this.elements.$rules = new EmbedlyRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Embedly
         * @memberOf EmbedlyView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEmbedly.bind(this)
            );
        }

    }, BaseView.prototype)

});
