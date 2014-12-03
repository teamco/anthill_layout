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
    'plugins/widgets/twitr.pix/element/twitr.pix.element',
    'plugins/widgets/twitr.pix/element/twitr.pix.preferences.element',
    'plugins/widgets/twitr.pix/element/twitr.pix.rules.element'
], function defineTwitrPixView(BaseView, Header, Footer, TwitrPixElement, TwitrPixPreferencesElement, TwitrPixRulesElement) {

    /**
     * Define view
     * @class TwitrPixView
     * @extends BaseView
     * @constructor
     */
    var TwitrPixView = function TwitrPixView() {
    };

    return TwitrPixView.extend('TwitrPixView', {

        /**
         * Render twitrpix element
         * @member TwitrPixView
         */
        renderTwitrPix: function renderTwitrPix() {

            this.header(Header, this.elements.$container);

            /**
             * Define $twitrpix
             * @type {TwitrPixElement}
             */
            this.elements.$twitrpix = new TwitrPixElement(this, {
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
         * @member TwitrPixView
         * @returns {TwitrPixPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TwitrPix Preferences Element
             * @type {TwitrPixPreferencesElement}
             */
            this.elements.$preferences = new TwitrPixPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member TwitrPixView
         * @param widgetRules
         * @param contentRules
         * @returns {TwitrPixRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define TwitrPix Rules Element
             * @type {TwitrPixRulesElement}
             */
            this.elements.$rules = new TwitrPixRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render twitrpix
         * @member TwitrPixView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTwitrPix.bind(this)
            );
        }

    }, BaseView.prototype)

});
