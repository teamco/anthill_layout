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
    'plugins/widgets/blip.tv/element/blip.tv.element',
    'plugins/widgets/blip.tv/element/blip.tv.preferences.element',
    'plugins/widgets/blip.tv/element/blip.tv.rules.element'
], function defineBlipTvView(BaseView, Header, Footer, BlipTvElement, BlipTvPreferencesElement, BlipTvRulesElement) {

    /**
     * Define view
     * @class BlipTvView
     * @extends BaseView
     * @constructor
     */
    var BlipTvView = function BlipTvView() {
    };

    return BlipTvView.extend('BlipTvView', {

        /**
         * Render bliptv element
         * @member BlipTvView
         */
        renderBlipTv: function renderBlipTv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $bliptv
             * @type {BlipTvElement}
             */
            this.elements.$bliptv = new BlipTvElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member BlipTvView
         * @returns {BlipTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define BlipTv Preferences Element
             * @type {BlipTvPreferencesElement}
             */
            this.elements.$preferences = new BlipTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member BlipTvView
         * @param widgetRules
         * @param contentRules
         * @returns {BlipTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define BlipTv Rules Element
             * @type {BlipTvRulesElement}
             */
            this.elements.$rules = new BlipTvRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render bliptv
         * @member BlipTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderBlipTv.bind(this)
            );
        }

    }, BaseView.prototype)

});
