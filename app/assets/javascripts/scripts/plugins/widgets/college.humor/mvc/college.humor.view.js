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
    'plugins/widgets/college.humor/element/college.humor.element',
    'plugins/widgets/college.humor/element/college.humor.preferences.element',
    'plugins/widgets/college.humor/element/college.humor.rules.element'
], function defineCollegeHumorView(BaseView, Header, Footer, CollegeHumorElement, CollegeHumorPreferencesElement, CollegeHumorRulesElement) {

    /**
     * Define view
     * @class CollegeHumorView
     * @extends BaseView
     * @constructor
     */
    var CollegeHumorView = function CollegeHumorView() {
    };

    return CollegeHumorView.extend('CollegeHumorView', {

        /**
         * Render collegehumor element
         * @member CollegeHumorView
         */
        renderCollegeHumor: function renderCollegeHumor() {

            this.header(Header, this.elements.$container);

            /**
             * Define $collegehumor
             * @type {CollegeHumorElement}
             */
            this.elements.$collegehumor = new CollegeHumorElement(this, {
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
         * @member CollegeHumorView
         * @returns {CollegeHumorPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define CollegeHumor Preferences Element
             * @type {CollegeHumorPreferencesElement}
             */
            this.elements.$preferences = new CollegeHumorPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member CollegeHumorView
         * @param widgetRules
         * @param contentRules
         * @returns {CollegeHumorRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define CollegeHumor Rules Element
             * @type {CollegeHumorRulesElement}
             */
            this.elements.$rules = new CollegeHumorRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render collegehumor
         * @member CollegeHumorView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderCollegeHumor.bind(this)
            );
        }

    }, BaseView.prototype)

});
