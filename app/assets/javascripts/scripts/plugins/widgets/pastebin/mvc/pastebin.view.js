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
    'plugins/widgets/pastebin/element/pastebin.element',
    'plugins/widgets/pastebin/element/pastebin.preferences.element',
    'plugins/widgets/pastebin/element/pastebin.rules.element'
], function definePastebinView(BaseView, Header, Footer, PastebinElement, PastebinPreferencesElement, PastebinRulesElement) {

    /**
     * Define view
     * @class PastebinView
     * @extends BaseView
     * @constructor
     */
    var PastebinView = function PastebinView() {
    };

    return PastebinView.extend('PastebinView', {

        /**
         * Render pastebin element
         * @memberOf PastebinView
         */
        renderPastebin: function renderPastebin() {

            this.header(Header, this.get$container());

            /**
             * Define $pastebin
             * @type {PastebinElement}
             */
            this.elements.$pastebin = new PastebinElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PastebinView
         * @returns {PastebinPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Pastebin Preferences Element
             * @type {PastebinPreferencesElement}
             */
            this.elements.$preferences = new PastebinPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PastebinView
         * @param widgetRules
         * @param contentRules
         * @returns {PastebinRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Pastebin Rules Element
             * @type {PastebinRulesElement}
             */
            this.elements.$rules = new PastebinRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render pastebin
         * @memberOf PastebinView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPastebin.bind(this)
            );
        }

    }, BaseView.prototype)

});
