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
    'plugins/widgets/post.tool/element/post.tool.element',
    'plugins/widgets/post.tool/element/post.tool.preferences.element',
    'plugins/widgets/post.tool/element/post.tool.rules.element'
], function definePostToolView(BaseView, Header, Footer, PostToolElement, PostToolPreferencesElement, PostToolRulesElement) {

    /**
     * Define view
     * @class PostToolView
     * @extends BaseView
     * @constructor
     */
    var PostToolView = function PostToolView() {
    };

    return PostToolView.extend('PostToolView', {

        /**
         * Render post.tool element
         * @member PostToolView
         */
        renderPostTool: function renderPostTool() {

            this.header(Header, this.elements.$container);

            /**
             * Define $post.tool
             * @type {PostToolElement}
             */
            this.elements.$posttool = new PostToolElement(this, {
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
         * @member PostToolView
         * @returns {PostToolPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Post tool Preferences Element
             * @type {PostToolPreferencesElement}
             */
            this.elements.$preferences = new PostToolPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PostToolView
         * @param widgetRules
         * @param contentRules
         * @returns {PostToolRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define PostTool Rules Element
             * @type {PostToolRulesElement}
             */
            this.elements.$rules = new PostToolRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render post.tool
         * @member PostToolView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPostTool.bind(this)
            );
        }

    }, BaseView.prototype)

});