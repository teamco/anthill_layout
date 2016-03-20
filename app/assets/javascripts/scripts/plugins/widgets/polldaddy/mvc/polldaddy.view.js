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
    'plugins/widgets/polldaddy/element/polldaddy.element',
    'plugins/widgets/polldaddy/element/polldaddy.preferences.element',
    'plugins/widgets/polldaddy/element/polldaddy.rules.element'
], function definePolldaddyView(BaseView, Header, Footer, PolldaddyElement, PolldaddyPreferencesElement, PolldaddyRulesElement) {

    /**
     * Define view
     * @class PolldaddyView
     * @extends BaseView
     * @constructor
     */
    var PolldaddyView = function PolldaddyView() {
    };

    return PolldaddyView.extend('PolldaddyView', {

        /**
         * Render polldaddy element
         * @memberOf PolldaddyView
         */
        renderPolldaddy: function renderPolldaddy() {

            this.header(Header, this.get$container());

            /**
             * Define $polldaddy
             * @type {PolldaddyElement}
             */
            this.elements.$polldaddy = new PolldaddyElement(this, {
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
         * @memberOf PolldaddyView
         * @returns {PolldaddyPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Polldaddy Preferences Element
             * @type {PolldaddyPreferencesElement}
             */
            this.elements.$preferences = new PolldaddyPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf PolldaddyView
         * @param widgetRules
         * @param contentRules
         * @returns {PolldaddyRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Polldaddy Rules Element
             * @type {PolldaddyRulesElement}
             */
            this.elements.$rules = new PolldaddyRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render polldaddy
         * @memberOf PolldaddyView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPolldaddy.bind(this)
            );
        }

    }, BaseView.prototype)

});
