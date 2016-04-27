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
    'plugins/widgets/docs.com/element/docs.com.element',
    'plugins/widgets/docs.com/element/docs.com.preferences.element',
    'plugins/widgets/docs.com/element/docs.com.rules.element'
], function defineDocsComView(BaseView, Header, Footer, DocsComElement, DocsComPreferencesElement, DocsComRulesElement) {

    /**
     * Define view
     * @class DocsComView
     * @extends BaseView
     * @constructor
     */
    var DocsComView = function DocsComView() {
    };

    return DocsComView.extend('DocsComView', {

        /**
         * Render DocsCom element
         * @memberOf DocsComView
         */
        renderDocsCom: function renderDocsCom() {

            this.header(Header, this.get$container());

            /**
             * Define $docscom
             * @type {DocsComElement}
             */
            this.elements.$docscom = new DocsComElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf DocsComView
         * @returns {DocsComPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define DocsCom Preferences Element
             * @type {DocsComPreferencesElement}
             */
            this.elements.$preferences = new DocsComPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf DocsComView
         * @param widgetRules
         * @param contentRules
         * @returns {DocsComRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define DocsCom Rules Element
             * @type {DocsComRulesElement}
             */
            this.elements.$rules = new DocsComRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render DocsCom
         * @memberOf DocsComView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderDocsCom.bind(this)
            );
        }

    }, BaseView.prototype);
});
