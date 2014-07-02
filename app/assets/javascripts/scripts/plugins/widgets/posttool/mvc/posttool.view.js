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
    'plugins/widgets/posttool/element/posttool.element',
    'plugins/widgets/posttool/element/posttool.preferences.element',
    'plugins/widgets/posttool/element/posttool.rules.element'
], function definePostoolView(BaseView, Header, Footer, PostoolElement, PostoolPreferencesElement, PostoolRulesElement) {

    /**
     * Define view
     * @class PostoolView
     * @extends BaseView
     * @constructor
     */
    var PostoolView = function PostoolView() {
    };

    return PostoolView.extend('PostoolView', {

        /**
         * Render posttool element
         * @member PostoolView
         */
        renderPostool: function renderPostool() {

            this.header(Header, this.elements.$container);

            /**
             * Define $posttool
             * @type {PostoolElement}
             */
            this.elements.$posttool = new PostoolElement(this, {
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
         * @member PostoolView
         * @returns {PostoolPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Postool Preferences Element
             * @type {PostoolPreferencesElement}
             */
            this.elements.$preferences = new PostoolPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PostoolView
         * @param widgetRules
         * @param contentRules
         * @returns {PostoolRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Postool Rules Element
             * @type {PostoolRulesElement}
             */
            this.elements.$rules = new PostoolRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render posttool
         * @member PostoolView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPostool.bind(this)
            );
        }

    }, BaseView.prototype)

});