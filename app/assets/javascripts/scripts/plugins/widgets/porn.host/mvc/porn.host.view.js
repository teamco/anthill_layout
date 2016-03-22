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
    'plugins/widgets/porn.host/element/porn.host.element',
    'plugins/widgets/porn.host/element/porn.host.preferences.element',
    'plugins/widgets/porn.host/element/porn.host.rules.element'
], function definePornHostView(BaseView, Header, Footer, PornHostElement, PornHostPreferencesElement, PornHostRulesElement) {

    /**
     * Define view
     * @class PornHostView
     * @extends BaseView
     * @constructor
     */
    var PornHostView = function PornHostView() {
    };

    return PornHostView.extend('PornHostView', {

        /**
         * Render pornhost element
         * @memberOf PornHostView
         */
        renderPornHost: function renderPornHost() {

            this.header(Header, this.get$container());

            /**
             * Define $pornhost
             * @type {PornHostElement}
             */
            this.elements.$pornhost = new PornHostElement(this, {
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
         * @memberOf PornHostView
         * @returns {PornHostPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PornHost Preferences Element
             * @type {PornHostPreferencesElement}
             */
            this.elements.$preferences = new PornHostPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf PornHostView
         * @param widgetRules
         * @param contentRules
         * @returns {PornHostRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define PornHost Rules Element
             * @type {PornHostRulesElement}
             */
            this.elements.$rules = new PornHostRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render pornhost
         * @memberOf PornHostView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPornHost.bind(this)
            );
        }

    }, BaseView.prototype)

});
