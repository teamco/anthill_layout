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
], function definePosttoolView(BaseView, Header, Footer, PosttoolElement, PosttoolPreferencesElement, PosttoolRulesElement) {

    /**
     * Define view
     * @class PosttoolView
     * @extends BaseView
     * @constructor
     */
    var PosttoolView = function PosttoolView() {
    };

    return PosttoolView.extend('PosttoolView', {

        /**
         * Render posttool element
         * @member PosttoolView
         */
        renderPostool: function renderPostool() {

            this.header(Header, this.elements.$container);

            /**
             * Define $posttool
             * @type {PosttoolElement}
             */
            this.elements.$posttool = new PosttoolElement(this, {
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
         * @member PosttoolView
         * @returns {PostoolPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Post tool Preferences Element
             * @type {PosttoolPreferencesElement}
             */
            this.elements.$preferences = new PosttoolPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member PosttoolView
         * @param widgetRules
         * @param contentRules
         * @returns {PosttoolRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Postool Rules Element
             * @type {PosttoolRulesElement}
             */
            this.elements.$rules = new PosttoolRulesElement(this, {
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
         * @member PosttoolView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPostool.bind(this)
            );
        }

    }, BaseView.prototype)

});