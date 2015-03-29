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
    'plugins/widgets/radikal.foto/element/radikal.foto.element',
    'plugins/widgets/radikal.foto/element/radikal.foto.preferences.element',
    'plugins/widgets/radikal.foto/element/radikal.foto.rules.element'
], function defineRadikalFotoView(BaseView, Header, Footer, RadikalFotoElement, RadikalFotoPreferencesElement, RadikalFotoRulesElement) {

    /**
     * Define view
     * @class RadikalFotoView
     * @extends BaseView
     * @constructor
     */
    var RadikalFotoView = function RadikalFotoView() {
    };

    return RadikalFotoView.extend('RadikalFotoView', {

        /**
         * Render radikalfoto element
         * @member RadikalFotoView
         */
        renderRadikalFoto: function renderRadikalFoto() {

            this.header(Header, this.elements.$container);

            /**
             * Define $radikalfoto
             * @type {RadikalFotoElement}
             */
            this.elements.$radikalfoto = new RadikalFotoElement(this, {
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
         * @member RadikalFotoView
         * @returns {RadikalFotoPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define RadikalFoto Preferences Element
             * @type {RadikalFotoPreferencesElement}
             */
            this.elements.$preferences = new RadikalFotoPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member RadikalFotoView
         * @param widgetRules
         * @param contentRules
         * @returns {RadikalFotoRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define RadikalFoto Rules Element
             * @type {RadikalFotoRulesElement}
             */
            this.elements.$rules = new RadikalFotoRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render radikalfoto
         * @member RadikalFotoView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderRadikalFoto.bind(this)
            );
        }

    }, BaseView.prototype)

});