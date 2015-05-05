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
    'plugins/widgets/pixiv/element/pixiv.element',
    'plugins/widgets/pixiv/element/pixiv.preferences.element',
    'plugins/widgets/pixiv/element/pixiv.rules.element'
], function definePixivView(BaseView, Header, Footer, PixivElement, PixivPreferencesElement, PixivRulesElement) {

    /**
     * Define view
     * @class PixivView
     * @extends BaseView
     * @constructor
     */
    var PixivView = function PixivView() {
    };

    return PixivView.extend('PixivView', {

        /**
         * Render pixiv element
         * @memberOf PixivView
         */
        renderPixiv: function renderPixiv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $pixiv
             * @type {PixivElement}
             */
            this.elements.$pixiv = new PixivElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventManager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf PixivView
         * @returns {PixivPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Pixiv Preferences Element
             * @type {PixivPreferencesElement}
             */
            this.elements.$preferences = new PixivPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf PixivView
         * @param widgetRules
         * @param contentRules
         * @returns {PixivRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Pixiv Rules Element
             * @type {PixivRulesElement}
             */
            this.elements.$rules = new PixivRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render pixiv
         * @memberOf PixivView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderPixiv.bind(this)
            );
        }

    }, BaseView.prototype)

});
