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
    'plugins/widgets/tube.eight/element/tube.eight.element',
    'plugins/widgets/tube.eight/element/tube.eight.preferences.element',
    'plugins/widgets/tube.eight/element/tube.eight.rules.element'
], function defineTubeEightView(BaseView, Header, Footer, TubeEightElement, TubeEightPreferencesElement, TubeEightRulesElement) {

    /**
     * Define view
     * @class TubeEightView
     * @extends BaseView
     * @constructor
     */
    var TubeEightView = function TubeEightView() {
    };

    return TubeEightView.extend('TubeEightView', {

        /**
         * Render tubeeight element
         * @memberOf TubeEightView
         */
        renderTubeEight: function renderTubeEight() {

            this.header(Header, this.elements.$container);

            /**
             * Define $tubeeight
             * @type {TubeEightElement}
             */
            this.elements.$tubeeight = new TubeEightElement(this, {
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
         * @memberOf TubeEightView
         * @returns {TubeEightPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TubeEight Preferences Element
             * @type {TubeEightPreferencesElement}
             */
            this.elements.$preferences = new TubeEightPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf TubeEightView
         * @param widgetRules
         * @param contentRules
         * @returns {TubeEightRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define TubeEight Rules Element
             * @type {TubeEightRulesElement}
             */
            this.elements.$rules = new TubeEightRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render tubeeight
         * @memberOf TubeEightView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTubeEight.bind(this)
            );
        }

    }, BaseView.prototype)

});
