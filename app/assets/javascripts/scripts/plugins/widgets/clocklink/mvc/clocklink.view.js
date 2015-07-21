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
    'plugins/widgets/clocklink/element/clocklink.element',
    'plugins/widgets/clocklink/element/clocklink.preferences.element',
    'plugins/widgets/clocklink/element/clocklink.rules.element'
], function defineClocklinkView(BaseView, Header, Footer, ClocklinkElement, ClocklinkPreferencesElement, ClocklinkRulesElement) {

    /**
     * Define view
     * @class ClocklinkView
     * @extends BaseView
     * @constructor
     */
    var ClocklinkView = function ClocklinkView() {
    };

    return ClocklinkView.extend('ClocklinkView', {

        /**
         * Render Clocklink element
         * @memberOf ClocklinkView
         */
        renderClocklink: function renderClocklink() {

            this.header(Header, this.elements.$container);

            /**
             * Define $clocklink
             * @type {ClocklinkElement}
             */
            this.elements.$clocklink = new ClocklinkElement(this, {
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
         * @memberOf ClocklinkView
         * @returns {ClocklinkPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Clocklink Preferences Element
             * @type {ClocklinkPreferencesElement}
             */
            this.elements.$preferences = new ClocklinkPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf ClocklinkView
         * @param widgetRules
         * @param contentRules
         * @returns {ClocklinkRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Clocklink Rules Element
             * @type {ClocklinkRulesElement}
             */
            this.elements.$rules = new ClocklinkRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render Clocklink
         * @memberOf ClocklinkView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderClocklink.bind(this)
            );
        }

    }, BaseView.prototype)

});
