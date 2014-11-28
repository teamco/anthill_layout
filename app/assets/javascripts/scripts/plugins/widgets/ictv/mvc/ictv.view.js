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
    'plugins/widgets/ictv/element/ictv.element',
    'plugins/widgets/ictv/element/ictv.preferences.element',
    'plugins/widgets/ictv/element/ictv.rules.element'
], function defineIctvView(BaseView, Header, Footer, IctvElement, IctvPreferencesElement, IctvRulesElement) {

    /**
     * Define view
     * @class IctvView
     * @extends BaseView
     * @constructor
     */
    var IctvView = function IctvView() {
    };

    return IctvView.extend('IctvView', {

        /**
         * Render ictv element
         * @member IctvView
         */
        renderIctv: function renderIctv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $ictv
             * @type {IctvElement}
             */
            this.elements.$ictv = new IctvElement(this, {
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
         * @member IctvView
         * @returns {IctvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Ictv Preferences Element
             * @type {IctvPreferencesElement}
             */
            this.elements.$preferences = new IctvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member IctvView
         * @param widgetRules
         * @param contentRules
         * @returns {IctvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Ictv Rules Element
             * @type {IctvRulesElement}
             */
            this.elements.$rules = new IctvRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render ictv
         * @member IctvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderIctv.bind(this)
            );
        }

    }, BaseView.prototype)

});
