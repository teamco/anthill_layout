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
    'plugins/widgets/ubr/element/ubr.element',
    'plugins/widgets/ubr/element/ubr.preferences.element',
    'plugins/widgets/ubr/element/ubr.rules.element'
], function defineUbrView(BaseView, Header, Footer, UbrElement, UbrPreferencesElement, UbrRulesElement) {

    /**
     * Define view
     * @class UbrView
     * @extends BaseView
     * @constructor
     */
    var UbrView = function UbrView() {
    };

    return UbrView.extend('UbrView', {

        /**
         * Render ubr element
         * @memberOf UbrView
         */
        renderUbr: function renderUbr() {

            this.header(Header, this.get$container());

            /**
             * Define $ubr
             * @type {UbrElement}
             */
            this.elements.$ubr = new UbrElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf UbrView
         * @returns {UbrPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Ubr Preferences Element
             * @type {UbrPreferencesElement}
             */
            this.elements.$preferences = new UbrPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf UbrView
         * @param widgetRules
         * @param contentRules
         * @returns {UbrRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Ubr Rules Element
             * @type {UbrRulesElement}
             */
            this.elements.$rules = new UbrRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render ubr
         * @memberOf UbrView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderUbr.bind(this)
            );
        }

    }, BaseView.prototype)

});
