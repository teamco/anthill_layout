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
    'plugins/widgets/codepen.io/element/codepen.io.element',
    'plugins/widgets/codepen.io/element/codepen.io.preferences.element',
    'plugins/widgets/codepen.io/element/codepen.io.rules.element'
], function defineCodepenIoView(BaseView, Header, Footer, CodepenIoElement, CodepenIoPreferencesElement, CodepenIoRulesElement) {

    /**
     * Define view
     * @class CodepenIoView
     * @extends BaseView
     * @constructor
     */
    var CodepenIoView = function CodepenIoView() {
    };

    return CodepenIoView.extend('CodepenIoView', {

        /**
         * Render CodepenIo element
         * @memberOf CodepenIoView
         */
        renderCodepenIo: function renderCodepenIo() {

            this.header(Header, this.get$container());

            /**
             * Define $codepenio
             * @type {CodepenIoElement}
             */
            this.elements.$codepenio = new CodepenIoElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf CodepenIoView
         * @returns {CodepenIoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define CodepenIo Preferences Element
             * @type {CodepenIoPreferencesElement}
             */
            this.elements.$preferences = new CodepenIoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf CodepenIoView
         * @param widgetRules
         * @param contentRules
         * @returns {CodepenIoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define CodepenIo Rules Element
             * @type {CodepenIoRulesElement}
             */
            this.elements.$rules = new CodepenIoRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render CodepenIo
         * @memberOf CodepenIoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderCodepenIo.bind(this)
            );
        }

    }, BaseView.prototype);
});
