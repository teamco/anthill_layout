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
    'plugins/widgets/picasa/element/picasa.element',
    'plugins/widgets/picasa/element/picasa.preferences.element',
    'plugins/widgets/picasa/element/picasa.rules.element'
], function definePicasaView(BaseView, Header, Footer, PicasaElement, PicasaPreferencesElement, PicasaRulesElement) {

    /**
     * Define view
     * @class PicasaView
     * @extends BaseView
     * @constructor
     */
    var PicasaView = function PicasaView() {
    };

    return PicasaView.extend('PicasaView', {

        /**
         * Render picasa element
         * @memberOf PicasaView
         */
        renderPicasa: function renderPicasa() {

            this.header(Header, this.get$container());

            /**
             * Define $picasa
             * @type {PicasaElement}
             */
            this.elements.$picasa = new PicasaElement(this, {
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
         * @memberOf PicasaView
         * @returns {PicasaPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Picasa Preferences Element
             * @type {PicasaPreferencesElement}
             */
            this.elements.$preferences = new PicasaPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf PicasaView
         * @param widgetRules
         * @param contentRules
         * @returns {PicasaRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Picasa Rules Element
             * @type {PicasaRulesElement}
             */
            this.elements.$rules = new PicasaRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render picasa
         * @memberOf PicasaView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPicasa.bind(this)
            );
        }

    }, BaseView.prototype)

});
