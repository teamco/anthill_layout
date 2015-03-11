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
         * @member SmotriComView
         */
        renderSmotriCom: function renderSmotriCom() {

            this.header(Header, this.elements.$container);

            /**
             * Define $smotricom
             * @type {SmotriComElement}
             */
            this.elements.$smotricom = new SmotriComElement(this, {
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
         * @member SmotriComView
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

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member SmotriComView
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

            return this.elements.$rules;
        },

        /**
         * Render smotricom
         * @member SmotriComView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSmotriCom.bind(this)
            );
        }

    }, BaseView.prototype)

});
