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
    'plugins/widgets/ice.floe/element/ice.floe.element',
    'plugins/widgets/ice.floe/element/ice.floe.preferences.element',
    'plugins/widgets/ice.floe/element/ice.floe.rules.element'
], function defineIceFloeView(BaseView, Header, Footer, IceFloeElement, IceFloePreferencesElement, IceFloeRulesElement) {

    /**
     * Define view
     * @class IceFloeView
     * @extends BaseView
     * @constructor
     */
    var IceFloeView = function IceFloeView() {
    };

    return IceFloeView.extend('IceFloeView', {

        /**
         * Render ice.floe element
         * @memberOf IceFloeView
         */
        renderIceFloe: function renderIceFloe() {

            this.header(Header, this.get$container());

            /**
             * Define $ice.floe
             * @type {IceFloeElement}
             */
            this.elements.$icefloe = new IceFloeElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf IceFloeView
         * @returns {IceFloePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define IceFloe Preferences Element
             * @type {IceFloePreferencesElement}
             */
            this.elements.$preferences = new IceFloePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf IceFloeView
         * @param widgetRules
         * @param contentRules
         * @returns {IceFloeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define IceFloe Rules Element
             * @type {IceFloeRulesElement}
             */
            this.elements.$rules = new IceFloeRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render ice.floe
         * @memberOf IceFloeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderIceFloe.bind(this)
            );
        }

    }, BaseView.prototype)

});