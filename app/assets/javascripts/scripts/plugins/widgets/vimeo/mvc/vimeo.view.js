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
    'plugins/widgets/vimeo/element/vimeo.element',
    'plugins/widgets/vimeo/element/vimeo.preferences.element',
    'plugins/widgets/vimeo/element/vimeo.rules.element'
], function defineVimeoView(BaseView, Header, Footer, VimeoElement, VimeoPreferencesElement, VimeoRulesElement) {

    /**
     * Define view
     * @class VimeoView
     * @extends BaseView
     * @constructor
     */
    var VimeoView = function VimeoView() {
    };

    return VimeoView.extend('VimeoView', {

        /**
         * Render vimeo element
         * @member VimeoView
         */
        renderVimeo: function renderVimeo() {

            this.header(Header, this.elements.$container);

            /**
             * Define $vimeo
             * @type {VimeoElement}
             */
            this.elements.$vimeo = new VimeoElement(this, {
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
         * @member VimeoView
         * @returns {VimeoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Vimeo Preferences Element
             * @type {VimeoPreferencesElement}
             */
            this.elements.$preferences = new VimeoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member VimeoView
         * @param widgetRules
         * @param contentRules
         * @returns {VimeoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Vimeo Rules Element
             * @type {VimeoRulesElement}
             */
            this.elements.$rules = new VimeoRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render vimeo
         * @member VimeoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderVimeo.bind(this)
            );
        }

    }, BaseView.prototype)

});