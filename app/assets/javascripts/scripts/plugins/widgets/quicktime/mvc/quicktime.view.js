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
    'plugins/widgets/quicktime/element/quicktime.element',
    'plugins/widgets/quicktime/element/quicktime.preferences.element',
    'plugins/widgets/quicktime/element/quicktime.rules.element'
], function defineQuicktimeView(BaseView, Header, Footer, QuicktimeElement, QuicktimePreferencesElement, QuicktimeRulesElement) {

    /**
     * Define view
     * @class QuicktimeView
     * @extends BaseView
     * @constructor
     */
    var QuicktimeView = function QuicktimeView() {
    };

    return QuicktimeView.extend('QuicktimeView', {

        /**
         * Render quicktime element
         * @memberOf QuicktimeView
         */
        renderQuicktime: function renderQuicktime() {

            this.header(Header, this.elements.$container);

            /**
             * Define $quicktime
             * @type {QuicktimeElement}
             */
            this.elements.$quicktime = new QuicktimeElement(this, {
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
         * @memberOf QuicktimeView
         * @returns {QuicktimePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Quicktime Preferences Element
             * @type {QuicktimePreferencesElement}
             */
            this.elements.$preferences = new QuicktimePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf QuicktimeView
         * @param widgetRules
         * @param contentRules
         * @returns {QuicktimeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Quicktime Rules Element
             * @type {QuicktimeRulesElement}
             */
            this.elements.$rules = new QuicktimeRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render quicktime
         * @memberOf QuicktimeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderQuicktime.bind(this)
            );
        }

    }, BaseView.prototype)

});