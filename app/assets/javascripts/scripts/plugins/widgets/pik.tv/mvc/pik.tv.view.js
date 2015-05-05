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
    'plugins/widgets/pik.tv/element/pik.tv.element',
    'plugins/widgets/pik.tv/element/pik.tv.preferences.element',
    'plugins/widgets/pik.tv/element/pik.tv.rules.element'
], function definePikTvView(BaseView, Header, Footer, PikTvElement, PikTvPreferencesElement, PikTvRulesElement) {

    /**
     * Define view
     * @class PikTvView
     * @extends BaseView
     * @constructor
     */
    var PikTvView = function PikTvView() {
    };

    return PikTvView.extend('PikTvView', {

        /**
         * Render piktv element
         * @memberOf PikTvView
         */
        renderPikTv: function renderPikTv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $piktv
             * @type {PikTvElement}
             */
            this.elements.$piktv = new PikTvElement(this, {
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
         * @memberOf PikTvView
         * @returns {PikTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define PikTv Preferences Element
             * @type {PikTvPreferencesElement}
             */
            this.elements.$preferences = new PikTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf PikTvView
         * @param widgetRules
         * @param contentRules
         * @returns {PikTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define PikTv Rules Element
             * @type {PikTvRulesElement}
             */
            this.elements.$rules = new PikTvRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render piktv
         * @memberOf PikTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderPikTv.bind(this)
            );
        }

    }, BaseView.prototype)

});
