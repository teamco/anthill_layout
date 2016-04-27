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
    'plugins/widgets/embed.articles/element/embed.articles.element',
    'plugins/widgets/embed.articles/element/embed.articles.preferences.element',
    'plugins/widgets/embed.articles/element/embed.articles.rules.element'
], function defineEmbedArticlesView(BaseView, Header, Footer, EmbedArticlesElement, EmbedArticlesPreferencesElement, EmbedArticlesRulesElement) {

    /**
     * Define view
     * @class EmbedArticlesView
     * @extends BaseView
     * @constructor
     */
    var EmbedArticlesView = function EmbedArticlesView() {
    };

    return EmbedArticlesView.extend('EmbedArticlesView', {

        /**
         * Render EmbedArticles element
         * @memberOf EmbedArticlesView
         */
        renderEmbedArticles: function renderEmbedArticles() {

            this.header(Header, this.get$container());

            /**
             * Define $embedarticles
             * @type {EmbedArticlesElement}
             */
            this.elements.$embedarticles = new EmbedArticlesElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf EmbedArticlesView
         * @returns {EmbedArticlesPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define EmbedArticles Preferences Element
             * @type {EmbedArticlesPreferencesElement}
             */
            this.elements.$preferences = new EmbedArticlesPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf EmbedArticlesView
         * @param widgetRules
         * @param contentRules
         * @returns {EmbedArticlesRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define EmbedArticles Rules Element
             * @type {EmbedArticlesRulesElement}
             */
            this.elements.$rules = new EmbedArticlesRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render EmbedArticles
         * @memberOf EmbedArticlesView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEmbedArticles.bind(this)
            );
        }

    }, BaseView.prototype);
});
