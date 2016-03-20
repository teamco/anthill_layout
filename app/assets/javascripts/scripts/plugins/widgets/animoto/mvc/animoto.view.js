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
    'plugins/widgets/animoto/element/animoto.element',
    'plugins/widgets/animoto/element/animoto.preferences.element',
    'plugins/widgets/animoto/element/animoto.rules.element'
], function defineAnimotoView(BaseView, Header, Footer, AnimotoElement, AnimotoPreferencesElement, AnimotoRulesElement) {

    /**
     * Define view
     * @class AnimotoView
     * @extends BaseView
     * @constructor
     */
    var AnimotoView = function AnimotoView() {
    };

    return AnimotoView.extend('AnimotoView', {

        /**
         * Render animoto element
         * @memberOf AnimotoView
         */
        renderAnimoto: function renderAnimoto() {

            this.header(Header, this.getElementContainer());

            /**
             * Define $animoto
             * @type {AnimotoElement}
             */
            this.elements.$animoto = new AnimotoElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.getElementContainer());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf AnimotoView
         * @returns {AnimotoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Animoto Preferences Element
             * @type {AnimotoPreferencesElement}
             */
            this.elements.$preferences = new AnimotoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf AnimotoView
         * @param widgetRules
         * @param contentRules
         * @returns {AnimotoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Animoto Rules Element
             * @type {AnimotoRulesElement}
             */
            this.elements.$rules = new AnimotoRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render animoto
         * @memberOf AnimotoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderAnimoto.bind(this)
            );
        }

    }, BaseView.prototype)

});
