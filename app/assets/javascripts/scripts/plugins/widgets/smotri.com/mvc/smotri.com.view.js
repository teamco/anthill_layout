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
    'plugins/widgets/smotri.com/element/smotri.com.element',
    'plugins/widgets/smotri.com/element/smotri.com.preferences.element',
    'plugins/widgets/smotri.com/element/smotri.com.rules.element'
], function defineSmotriComView(BaseView, Header, Footer, SmotriComElement, SmotriComPreferencesElement, SmotriComRulesElement) {

    /**
     * Define view
     * @class SmotriComView
     * @extends BaseView
     * @constructor
     */
    var SmotriComView = function SmotriComView() {
    };

    return SmotriComView.extend('SmotriComView', {

        /**
         * Render smotricom element
         * @memberOf SmotriComView
         */
        renderSmotriCom: function renderSmotriCom() {

            this.header(Header, this.get$container());

            /**
             * Define $smotricom
             * @type {SmotriComElement}
             */
            this.elements.$smotricom = new SmotriComElement(this, {
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
         * @memberOf SmotriComView
         * @returns {SmotriComPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SmotriCom Preferences Element
             * @type {SmotriComPreferencesElement}
             */
            this.elements.$preferences = new SmotriComPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SmotriComView
         * @param widgetRules
         * @param contentRules
         * @returns {SmotriComRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define SmotriCom Rules Element
             * @type {SmotriComRulesElement}
             */
            this.elements.$rules = new SmotriComRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render smotricom
         * @memberOf SmotriComView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSmotriCom.bind(this)
            );
        }

    }, BaseView.prototype)

});
