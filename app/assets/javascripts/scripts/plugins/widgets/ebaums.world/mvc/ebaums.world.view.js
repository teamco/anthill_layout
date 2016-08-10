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
    'plugins/widgets/ebaums.world/element/ebaums.world.element',
    'plugins/widgets/ebaums.world/element/ebaums.world.preferences.element',
    'plugins/widgets/ebaums.world/element/ebaums.world.rules.element'
], function defineEbaumsWorldView(BaseView, Header, Footer, EbaumsWorldElement, EbaumsWorldPreferencesElement, EbaumsWorldRulesElement) {

    /**
     * Define view
     * @class EbaumsWorldView
     * @extends BaseView
     * @constructor
     */
    var EbaumsWorldView = function EbaumsWorldView() {
    };

    return EbaumsWorldView.extend('EbaumsWorldView', {

        /**
         * Render EbaumsWorld element
         * @memberOf EbaumsWorldView
         */
        renderEbaumsWorld: function renderEbaumsWorld() {

            this.header(Header, this.get$container());

            /**
             * Define $ebaumsworld
             * @type {EbaumsWorldElement}
             */
            this.elements.$ebaumsworld = new EbaumsWorldElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf EbaumsWorldView
         * @returns {EbaumsWorldPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define EbaumsWorld Preferences Element
             * @type {EbaumsWorldPreferencesElement}
             */
            this.elements.$preferences = new EbaumsWorldPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf EbaumsWorldView
         * @param widgetRules
         * @param contentRules
         * @returns {EbaumsWorldRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define EbaumsWorld Rules Element
             * @type {EbaumsWorldRulesElement}
             */
            this.elements.$rules = new EbaumsWorldRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render EbaumsWorld
         * @memberOf EbaumsWorldView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEbaumsWorld.bind(this)
            );
        }

    }, BaseView.prototype);
});
