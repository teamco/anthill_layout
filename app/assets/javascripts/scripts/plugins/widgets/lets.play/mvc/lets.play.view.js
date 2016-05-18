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
    'plugins/widgets/lets.play/element/lets.play.element',
    'plugins/widgets/lets.play/element/lets.play.preferences.element',
    'plugins/widgets/lets.play/element/lets.play.rules.element'
], function defineLetsPlayView(BaseView, Header, Footer, LetsPlayElement, LetsPlayPreferencesElement, LetsPlayRulesElement) {

    /**
     * Define view
     * @class LetsPlayView
     * @extends BaseView
     * @constructor
     */
    var LetsPlayView = function LetsPlayView() {
    };

    return LetsPlayView.extend('LetsPlayView', {

        /**
         * Render LetsPlay element
         * @memberOf LetsPlayView
         */
        renderLetsPlay: function renderLetsPlay() {

            this.header(Header, this.get$container());

            /**
             * Define $letsplay
             * @type {LetsPlayElement}
             */
            this.elements.$letsplay = new LetsPlayElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf LetsPlayView
         * @returns {LetsPlayPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define LetsPlay Preferences Element
             * @type {LetsPlayPreferencesElement}
             */
            this.elements.$preferences = new LetsPlayPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf LetsPlayView
         * @param widgetRules
         * @param contentRules
         * @returns {LetsPlayRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define LetsPlay Rules Element
             * @type {LetsPlayRulesElement}
             */
            this.elements.$rules = new LetsPlayRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render LetsPlay
         * @memberOf LetsPlayView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLetsPlay.bind(this)
            );
        }

    }, BaseView.prototype);
});
