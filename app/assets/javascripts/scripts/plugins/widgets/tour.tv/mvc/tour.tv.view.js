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
    'plugins/widgets/tour.tv/element/tour.tv.element',
    'plugins/widgets/tour.tv/element/tour.tv.preferences.element',
    'plugins/widgets/tour.tv/element/tour.tv.rules.element'
], function defineTourTvView(BaseView, Header, Footer, TourTvElement, TourTvPreferencesElement, TourTvRulesElement) {

    /**
     * Define view
     * @class TourTvView
     * @extends BaseView
     * @constructor
     */
    var TourTvView = function TourTvView() {
    };

    return TourTvView.extend('TourTvView', {

        /**
         * Render tourtv element
         * @memberOf TourTvView
         */
        renderTourTv: function renderTourTv() {

            this.header(Header, this.elements.$container);

            /**
             * Define $tourtv
             * @type {TourTvElement}
             */
            this.elements.$tourtv = new TourTvElement(this, {
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
         * @memberOf TourTvView
         * @returns {TourTvPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TourTv Preferences Element
             * @type {TourTvPreferencesElement}
             */
            this.elements.$preferences = new TourTvPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf TourTvView
         * @param widgetRules
         * @param contentRules
         * @returns {TourTvRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define TourTv Rules Element
             * @type {TourTvRulesElement}
             */
            this.elements.$rules = new TourTvRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render tourtv
         * @memberOf TourTvView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderTourTv.bind(this)
            );
        }

    }, BaseView.prototype)

});
