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
    'plugins/widgets/tinymce/element/tinymce.element',
    'plugins/widgets/tinymce/element/tinymce.preferences.element',
    'plugins/widgets/tinymce/element/tinymce.rules.element'
], function defineTinymceView(BaseView, Header, Footer, TinymceElement, TinymcePreferencesElement, TinymceRulesElement) {

    /**
     * Define view
     * @class TinymceView
     * @extends BaseView
     * @constructor
     */
    var TinymceView = function TinymceView() {
    };

    return TinymceView.extend('TinymceView', {

        /**
         * Render Tinymce element
         * @memberOf TinymceView
         */
        renderTinymce: function renderTinymce() {

            this.header(Header, this.get$container());

            /**
             * Define $tinymce
             * @type {TinymceElement}
             */
            this.elements.$tinymce = new TinymceElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf TinymceView
         * @returns {TinymcePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Tinymce Preferences Element
             * @type {TinymcePreferencesElement}
             */
            this.elements.$preferences = new TinymcePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf TinymceView
         * @param widgetRules
         * @param contentRules
         * @returns {TinymceRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Tinymce Rules Element
             * @type {TinymceRulesElement}
             */
            this.elements.$rules = new TinymceRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Tinymce
         * @memberOf TinymceView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTinymce.bind(this)
            );
        }

    }, BaseView.prototype);
});
