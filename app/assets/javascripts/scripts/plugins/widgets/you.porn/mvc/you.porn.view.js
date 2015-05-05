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
    'plugins/widgets/you.porn/element/you.porn.element',
    'plugins/widgets/you.porn/element/you.porn.preferences.element',
    'plugins/widgets/you.porn/element/you.porn.rules.element'
], function defineYouPornView(BaseView, Header, Footer, YouPornElement, YouPornPreferencesElement, YouPornRulesElement) {

    /**
     * Define view
     * @class YouPornView
     * @extends BaseView
     * @constructor
     */
    var YouPornView = function YouPornView() {
    };

    return YouPornView.extend('YouPornView', {

        /**
         * Render youporn element
         * @memberOf YouPornView
         */
        renderYouPorn: function renderYouPorn() {

            this.header(Header, this.elements.$container);

            /**
             * Define $youporn
             * @type {YouPornElement}
             */
            this.elements.$youporn = new YouPornElement(this, {
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
         * @memberOf YouPornView
         * @returns {YouPornPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define YouPorn Preferences Element
             * @type {YouPornPreferencesElement}
             */
            this.elements.$preferences = new YouPornPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf YouPornView
         * @param widgetRules
         * @param contentRules
         * @returns {YouPornRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define YouPorn Rules Element
             * @type {YouPornRulesElement}
             */
            this.elements.$rules = new YouPornRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render youporn
         * @memberOf YouPornView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderYouPorn.bind(this)
            );
        }

    }, BaseView.prototype)

});
