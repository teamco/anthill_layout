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
    'plugins/widgets/pavel/element/pavel.element',
    'plugins/widgets/pavel/element/pavel.preferences.element',
    'plugins/widgets/pavel/element/pavel.rules.element'
], function definePavelView(BaseView, Header, Footer, PavelElement, PavelPreferencesElement, PavelRulesElement) {

    /**
     * Define view
     * @class PavelView
     * @extends BaseView
     * @constructor
     */
    var PavelView = function PavelView() {
    };

    return PavelView.extend('PavelView', {

        /**
         * Render Pavel element
         * @memberOf PavelView
         */
        renderPavel: function renderPavel() {

            this.header(Header, this.get$container());

            /**
             * Define $pavel
             * @type {PavelElement}
             */
            this.elements.$pavel = new PavelElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PavelView
         * @returns {PavelPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Pavel Preferences Element
             * @type {PavelPreferencesElement}
             */
            this.elements.$preferences = new PavelPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf PavelView
         * @param widgetRules
         * @param contentRules
         * @returns {PavelRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Pavel Rules Element
             * @type {PavelRulesElement}
             */
            this.elements.$rules = new PavelRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Pavel
         * @memberOf PavelView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPavel.bind(this)
            );
        }

    }, BaseView.prototype);
});
