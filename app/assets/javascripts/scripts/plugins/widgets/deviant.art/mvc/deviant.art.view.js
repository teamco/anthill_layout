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
    'plugins/widgets/deviant.art/element/deviant.art.element',
    'plugins/widgets/deviant.art/element/deviant.art.preferences.element',
    'plugins/widgets/deviant.art/element/deviant.art.rules.element'
], function defineDeviantArtView(BaseView, Header, Footer, DeviantArtElement, DeviantArtPreferencesElement, DeviantArtRulesElement) {

    /**
     * Define view
     * @class DeviantArtView
     * @extends BaseView
     * @constructor
     */
    var DeviantArtView = function DeviantArtView() {
    };

    return DeviantArtView.extend('DeviantArtView', {

        /**
         * Render deviantart element
         * @member DeviantArtView
         */
        renderDeviantArt: function renderDeviantArt() {

            this.header(Header, this.elements.$container);

            /**
             * Define $deviantart
             * @type {DeviantArtElement}
             */
            this.elements.$deviantart = new DeviantArtElement(this, {
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
         * @member DeviantArtView
         * @returns {DeviantArtPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define DeviantArt Preferences Element
             * @type {DeviantArtPreferencesElement}
             */
            this.elements.$preferences = new DeviantArtPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member DeviantArtView
         * @param widgetRules
         * @param contentRules
         * @returns {DeviantArtRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define DeviantArt Rules Element
             * @type {DeviantArtRulesElement}
             */
            this.elements.$rules = new DeviantArtRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render deviantart
         * @member DeviantArtView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderDeviantArt.bind(this)
            );
        }

    }, BaseView.prototype)

});
