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
    'plugins/widgets/giphy/element/giphy.element',
    'plugins/widgets/giphy/element/giphy.preferences.element',
    'plugins/widgets/giphy/element/giphy.rules.element'
], function defineGiphyView(BaseView, Header, Footer, GiphyElement, GiphyPreferencesElement, GiphyRulesElement) {

    /**
     * Define view
     * @class GiphyView
     * @extends BaseView
     * @constructor
     */
    var GiphyView = function GiphyView() {
    };

    return GiphyView.extend('GiphyView', {

        /**
         * Render giphy element
         * @memberOf GiphyView
         */
        renderGiphy: function renderGiphy() {

            this.header(Header, this.elements.$container);

            /**
             * Define $giphy
             * @type {GiphyElement}
             */
            this.elements.$giphy = new GiphyElement(this, {
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
         * @memberOf GiphyView
         * @returns {GiphyPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Giphy Preferences Element
             * @type {GiphyPreferencesElement}
             */
            this.elements.$preferences = new GiphyPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf GiphyView
         * @param widgetRules
         * @param contentRules
         * @returns {GiphyRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Giphy Rules Element
             * @type {GiphyRulesElement}
             */
            this.elements.$rules = new GiphyRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render giphy
         * @memberOf GiphyView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderGiphy.bind(this)
            );
        }

    }, BaseView.prototype)

});
