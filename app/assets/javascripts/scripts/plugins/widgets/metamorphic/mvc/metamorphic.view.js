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
    'plugins/widgets/metamorphic/element/metamorphic.element',
    'plugins/widgets/metamorphic/element/metamorphic.preferences.element',
    'plugins/widgets/metamorphic/element/metamorphic.rules.element'
], function defineMetamorphicView(BaseView, Header, Footer, MetamorphicElement, MetamorphicPreferencesElement, MetamorphicRulesElement) {

    /**
     * Define view
     * @class MetamorphicView
     * @extends BaseView
     * @constructor
     */
    var MetamorphicView = function MetamorphicView() {
    };

    return MetamorphicView.extend('MetamorphicView', {

        /**
         * Render Metamorphic element
         * @memberOf MetamorphicView
         */
        renderMetamorphic: function renderMetamorphic() {

            this.header(Header, this.get$container());

            /**
             * Define $metamorphic
             * @type {MetamorphicElement}
             */
            this.elements.$metamorphic = new MetamorphicElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf MetamorphicView
         * @returns {MetamorphicPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Metamorphic Preferences Element
             * @type {MetamorphicPreferencesElement}
             */
            this.elements.$preferences = new MetamorphicPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf MetamorphicView
         * @param widgetRules
         * @param contentRules
         * @returns {MetamorphicRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Metamorphic Rules Element
             * @type {MetamorphicRulesElement}
             */
            this.elements.$rules = new MetamorphicRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Metamorphic
         * @memberOf MetamorphicView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMetamorphic.bind(this)
            );
        }

    }, BaseView.prototype);
});
