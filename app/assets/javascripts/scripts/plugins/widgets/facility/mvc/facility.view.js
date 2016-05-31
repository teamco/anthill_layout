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
    'plugins/widgets/facility/element/facility.element',
    'plugins/widgets/facility/element/facility.preferences.element',
    'plugins/widgets/facility/element/facility.rules.element'
], function defineFacilityView(BaseView, Header, Footer, FacilityElement, FacilityPreferencesElement, FacilityRulesElement) {

    /**
     * Define view
     * @class FacilityView
     * @extends BaseView
     * @constructor
     */
    var FacilityView = function FacilityView() {
    };

    return FacilityView.extend('FacilityView', {

        /**
         * Render Facility element
         * @memberOf FacilityView
         */
        renderFacility: function renderFacility() {

            this.header(Header, this.get$container());

            /**
             * Define $facility
             * @type {FacilityElement}
             */
            this.elements.$facility = new FacilityElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf FacilityView
         * @returns {FacilityPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Facility Preferences Element
             * @type {FacilityPreferencesElement}
             */
            this.elements.$preferences = new FacilityPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf FacilityView
         * @param widgetRules
         * @param contentRules
         * @returns {FacilityRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Facility Rules Element
             * @type {FacilityRulesElement}
             */
            this.elements.$rules = new FacilityRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Facility
         * @memberOf FacilityView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderFacility.bind(this)
            );
        }

    }, BaseView.prototype);
});
