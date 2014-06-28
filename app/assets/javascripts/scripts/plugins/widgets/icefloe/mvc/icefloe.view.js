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
    'plugins/widgets/icefloe/element/icefloe.element',
    'plugins/widgets/icefloe/element/icefloe.preferences.element',
    'plugins/widgets/icefloe/element/icefloe.rules.element'
], function defineIcefloeView(BaseView, Header, Footer, IcefloeElement, IcefloePreferencesElement, IcefloeRulesElement) {

    /**
     * Define view
     * @class IcefloeView
     * @extends BaseView
     * @constructor
     */
    var IcefloeView = function IcefloeView() {
    };

    return IcefloeView.extend('IcefloeView', {

        /**
         * Render icefloe element
         * @member IcefloeView
         */
        renderIcefloe: function renderIcefloe() {

            this.header(Header, this.elements.$container);

            /**
             * Define $icefloe
             * @type {IcefloeElement}
             */
            this.elements.$icefloe = new IcefloeElement(this, {
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
         * @member IcefloeView
         * @returns {IcefloePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Icefloe Preferences Element
             * @type {IcefloePreferencesElement}
             */
            this.elements.$preferences = new IcefloePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member IcefloeView
         * @param widgetRules
         * @param contentRules
         * @returns {IcefloeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Icefloe Rules Element
             * @type {IcefloeRulesElement}
             */
            this.elements.$rules = new IcefloeRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render icefloe
         * @member IcefloeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderIcefloe.bind(this)
            );
        }

    }, BaseView.prototype)

});