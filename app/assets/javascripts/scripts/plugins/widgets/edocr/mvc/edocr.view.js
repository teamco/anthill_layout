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
    'plugins/widgets/edocr/element/edocr.element',
    'plugins/widgets/edocr/element/edocr.preferences.element',
    'plugins/widgets/edocr/element/edocr.rules.element'
], function defineEdocrView(BaseView, Header, Footer, EdocrElement, EdocrPreferencesElement, EdocrRulesElement) {

    /**
     * Define view
     * @class EdocrView
     * @extends BaseView
     * @constructor
     */
    var EdocrView = function EdocrView() {
    };

    return EdocrView.extend('EdocrView', {

        /**
         * Render Edocr element
         * @memberOf EdocrView
         */
        renderEdocr: function renderEdocr() {

            this.header(Header, this.get$container());

            /**
             * Define $edocr
             * @type {EdocrElement}
             */
            this.elements.$edocr = new EdocrElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf EdocrView
         * @returns {EdocrPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Edocr Preferences Element
             * @type {EdocrPreferencesElement}
             */
            this.elements.$preferences = new EdocrPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf EdocrView
         * @param widgetRules
         * @param contentRules
         * @returns {EdocrRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Edocr Rules Element
             * @type {EdocrRulesElement}
             */
            this.elements.$rules = new EdocrRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Edocr
         * @memberOf EdocrView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEdocr.bind(this)
            );
        }

    }, BaseView.prototype);
});
