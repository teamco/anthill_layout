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
    'plugins/widgets/vidme/element/vidme.element',
    'plugins/widgets/vidme/element/vidme.preferences.element',
    'plugins/widgets/vidme/element/vidme.rules.element'
], function defineVidmeView(BaseView, Header, Footer, VidmeElement, VidmePreferencesElement, VidmeRulesElement) {

    /**
     * Define view
     * @class VidmeView
     * @extends BaseView
     * @constructor
     */
    var VidmeView = function VidmeView() {
    };

    return VidmeView.extend('VidmeView', {

        /**
         * Render vidme element
         * @member VidmeView
         */
        renderVidme: function renderVidme() {

            this.header(Header, this.elements.$container);

            /**
             * Define $vidme
             * @type {VidmeElement}
             */
            this.elements.$vidme = new VidmeElement(this, {
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
         * @member VidmeView
         * @returns {VidmePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Vidme Preferences Element
             * @type {VidmePreferencesElement}
             */
            this.elements.$preferences = new VidmePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member VidmeView
         * @param widgetRules
         * @param contentRules
         * @returns {VidmeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Vidme Rules Element
             * @type {VidmeRulesElement}
             */
            this.elements.$rules = new VidmeRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render vidme
         * @member VidmeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderVidme.bind(this)
            );
        }

    }, BaseView.prototype)

});
