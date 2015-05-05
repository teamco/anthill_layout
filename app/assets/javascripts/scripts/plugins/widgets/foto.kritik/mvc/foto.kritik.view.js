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
    'plugins/widgets/foto.kritik/element/foto.kritik.element',
    'plugins/widgets/foto.kritik/element/foto.kritik.preferences.element',
    'plugins/widgets/foto.kritik/element/foto.kritik.rules.element'
], function defineFotoKritikView(BaseView, Header, Footer, FotoKritikElement, FotoKritikPreferencesElement, FotoKritikRulesElement) {

    /**
     * Define view
     * @class FotoKritikView
     * @extends BaseView
     * @constructor
     */
    var FotoKritikView = function FotoKritikView() {
    };

    return FotoKritikView.extend('FotoKritikView', {

        /**
         * Render fotokritik element
         * @memberOf FotoKritikView
         */
        renderFotoKritik: function renderFotoKritik() {

            this.header(Header, this.elements.$container);

            /**
             * Define $fotokritik
             * @type {FotoKritikElement}
             */
            this.elements.$fotokritik = new FotoKritikElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventManager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf FotoKritikView
         * @returns {FotoKritikPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define FotoKritik Preferences Element
             * @type {FotoKritikPreferencesElement}
             */
            this.elements.$preferences = new FotoKritikPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf FotoKritikView
         * @param widgetRules
         * @param contentRules
         * @returns {FotoKritikRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define FotoKritik Rules Element
             * @type {FotoKritikRulesElement}
             */
            this.elements.$rules = new FotoKritikRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render fotokritik
         * @memberOf FotoKritikView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderFotoKritik.bind(this)
            );
        }

    }, BaseView.prototype)

});
