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
    'plugins/widgets/cacoo/element/cacoo.element',
    'plugins/widgets/cacoo/element/cacoo.preferences.element',
    'plugins/widgets/cacoo/element/cacoo.rules.element'
], function defineCacooView(BaseView, Header, Footer, CacooElement, CacooPreferencesElement, CacooRulesElement) {

    /**
     * Define view
     * @class CacooView
     * @extends BaseView
     * @constructor
     */
    var CacooView = function CacooView() {
    };

    return CacooView.extend('CacooView', {

        /**
         * Render Cacoo element
         * @memberOf CacooView
         */
        renderCacoo: function renderCacoo() {

            this.header(Header, this.get$container());

            /**
             * Define $cacoo
             * @type {CacooElement}
             */
            this.elements.$cacoo = new CacooElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf CacooView
         * @returns {CacooPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Cacoo Preferences Element
             * @type {CacooPreferencesElement}
             */
            this.elements.$preferences = new CacooPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf CacooView
         * @param widgetRules
         * @param contentRules
         * @returns {CacooRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Cacoo Rules Element
             * @type {CacooRulesElement}
             */
            this.elements.$rules = new CacooRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Cacoo
         * @memberOf CacooView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderCacoo.bind(this)
            );
        }

    }, BaseView.prototype);
});
