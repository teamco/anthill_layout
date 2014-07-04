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
    'plugins/widgets/postTemplate/element/postTemplate.element',
    'plugins/widgets/postTemplate/element/postTemplate.preferences.element',
    'plugins/widgets/postTemplate/element/postTemplate.rules.element'
], function definePostTemplateView(BaseView, Header, Footer, PostTemplateElement, PostTemplatePreferencesElement, PostTemplateRulesElement) {

    /**
     * Define view
     * @class PostTemplateView
     * @extends BaseView
     * @constructor
     */
    var PostTemplateView = function PostTemplateView() {
    };

    return PostTemplateView.extend('PostTemplateView', {

        /**
         * Render postTemplate element
         * @member PostTemplateView
         */
        renderPostTemplate: function renderPostTemplate() {

            this.header(Header, this.elements.$container);

            /**
             * Define $postTemplate
             * @type {PostTemplateElement}
             */
            this.elements.$postTemplate = new PostTemplateElement(this, {
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
         * @member PostTemplateView
         * @returns {PostTemplatePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PostTemplate Preferences Element
             * @type {PostTemplatePreferencesElement}
             */
            this.elements.$preferences = new PostTemplatePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PostTemplateView
         * @param widgetRules
         * @param contentRules
         * @returns {PostTemplateRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define PostTemplate Rules Element
             * @type {PostTemplateRulesElement}
             */
            this.elements.$rules = new PostTemplateRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render postTemplate
         * @member PostTemplateView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPostTemplate.bind(this)
            );
        }

    }, BaseView.prototype)

});