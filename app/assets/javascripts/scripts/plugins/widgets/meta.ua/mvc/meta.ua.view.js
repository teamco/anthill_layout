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
    'plugins/widgets/meta.ua/element/meta.ua.element',
    'plugins/widgets/meta.ua/element/meta.ua.preferences.element',
    'plugins/widgets/meta.ua/element/meta.ua.rules.element'
], function defineMetaUaView(BaseView, Header, Footer, MetaUaElement, MetaUaPreferencesElement, MetaUaRulesElement) {

    /**
     * Define view
     * @class MetaUaView
     * @extends BaseView
     * @constructor
     */
    var MetaUaView = function MetaUaView() {
    };

    return MetaUaView.extend('MetaUaView', {

        /**
         * Render meta element
         * @memberOf MetaUaView
         */
        renderMetaUa: function renderMetaUa() {

            this.header(Header, this.get$container());

            /**
             * Define $metaua
             * @type {MetaUaElement}
             */
            this.elements.$metaua = new MetaUaElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf MetaUaView
         * @returns {MetaUaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define MetaUa Preferences Element
             * @type {MetaUaPreferencesElement}
             */
            this.elements.$preferences = new MetaUaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf MetaUaView
         * @param widgetRules
         * @param contentRules
         * @returns {MetaUaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define MetaUa Rules Element
             * @type {MetaUaRulesElement}
             */
            this.elements.$rules = new MetaUaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render meta
         * @memberOf MetaUaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMetaUa.bind(this)
            );
        }

    }, BaseView.prototype)

});
