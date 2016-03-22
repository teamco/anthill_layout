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
    'plugins/widgets/daily.motion/element/daily.motion.element',
    'plugins/widgets/daily.motion/element/daily.motion.preferences.element',
    'plugins/widgets/daily.motion/element/daily.motion.rules.element'
], function defineDailyMotionView(BaseView, Header, Footer, DailyMotionElement, DailyMotionPreferencesElement, DailyMotionRulesElement) {

    /**
     * Define view
     * @class DailyMotionView
     * @extends BaseView
     * @constructor
     */
    var DailyMotionView = function DailyMotionView() {
    };

    return DailyMotionView.extend('DailyMotionView', {

        /**
         * Render dailymotion element
         * @memberOf DailyMotionView
         */
        renderDailyMotion: function renderDailyMotion() {

            this.header(Header, this.get$container());

            /**
             * Define $dailymotion
             * @type {DailyMotionElement}
             */
            this.elements.$dailymotion = new DailyMotionElement(this, {
                $container: this.get$container().$,
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf DailyMotionView
         * @returns {DailyMotionPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define DailyMotion Preferences Element
             * @type {DailyMotionPreferencesElement}
             */
            this.elements.$preferences = new DailyMotionPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf DailyMotionView
         * @param widgetRules
         * @param contentRules
         * @returns {DailyMotionRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define DailyMotion Rules Element
             * @type {DailyMotionRulesElement}
             */
            this.elements.$rules = new DailyMotionRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render dailymotion
         * @memberOf DailyMotionView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderDailyMotion.bind(this)
            );
        }

    }, BaseView.prototype)

});
