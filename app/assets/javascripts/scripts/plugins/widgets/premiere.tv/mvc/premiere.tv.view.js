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
    'plugins/widgets/premiere.tv/element/premiere.tv.element',
    'plugins/widgets/premiere.tv/element/premiere.tv.preferences.element',
    'plugins/widgets/premiere.tv/element/premiere.tv.rules.element'
], function definePremiereTvView(BaseView, Header, Footer, PremiereTvElement, PremiereTvPreferencesElement, PremiereTvRulesElement) {

    /**
     * Define view
     * @class PremiereTvView
     * @extends BaseView
     * @constructor
     */
    var PremiereTvView = function PremiereTvView() {
    };

    return PremiereTvView.extend('PremiereTvView', {

        /**
         * Render premieretv element
         * @memberOf PremiereTvView
         */
        renderPremiereTv: function renderPremiereTv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $premieretv
             * @type {PremiereTvElement}
             */
            this.elements.$premieretv = new PremiereTvElement(this, {
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
         * @memberOf PremiereTvView
         * @returns {PremiereTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PremiereTv Preferences Element
             * @type {PremiereTvPreferencesElement}
             */
            this.elements.$preferences = new PremiereTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf PremiereTvView
         * @param widgetRules
         * @param contentRules
         * @returns {PremiereTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define PremiereTv Rules Element
             * @type {PremiereTvRulesElement}
             */
            this.elements.$rules = new PremiereTvRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render premieretv
         * @memberOf PremiereTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderPremiereTv.bind(this)
            );
        }

    }, BaseView.prototype)

});
