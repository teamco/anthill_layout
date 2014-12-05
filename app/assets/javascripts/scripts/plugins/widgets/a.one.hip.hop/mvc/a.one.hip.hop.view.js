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
    'plugins/widgets/a.one.hip.hop/element/a.one.hip.hop.element',
    'plugins/widgets/a.one.hip.hop/element/a.one.hip.hop.preferences.element',
    'plugins/widgets/a.one.hip.hop/element/a.one.hip.hop.rules.element'
], function defineAOneHipHopView(BaseView, Header, Footer, AOneHipHopElement, AOneHipHopPreferencesElement, AOneHipHopRulesElement) {

    /**
     * Define view
     * @class AOneHipHopView
     * @extends BaseView
     * @constructor
     */
    var AOneHipHopView = function AOneHipHopView() {
    };

    return AOneHipHopView.extend('AOneHipHopView', {

        /**
         * Render aonehiphop element
         * @member AOneHipHopView
         */
        renderAOneHipHop: function renderAOneHipHop() {

            this.header(Header, this.elements.$container);

            /**
             * Define $aonehiphop
             * @type {AOneHipHopElement}
             */
            this.elements.$aonehiphop = new AOneHipHopElement(this, {
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
         * @member AOneHipHopView
         * @returns {AOneHipHopPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define AOneHipHop Preferences Element
             * @type {AOneHipHopPreferencesElement}
             */
            this.elements.$preferences = new AOneHipHopPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member AOneHipHopView
         * @param widgetRules
         * @param contentRules
         * @returns {AOneHipHopRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define AOneHipHop Rules Element
             * @type {AOneHipHopRulesElement}
             */
            this.elements.$rules = new AOneHipHopRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render aonehiphop
         * @member AOneHipHopView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderAOneHipHop.bind(this)
            );
        }

    }, BaseView.prototype)

});
