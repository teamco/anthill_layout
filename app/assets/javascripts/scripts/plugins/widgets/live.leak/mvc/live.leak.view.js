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
    'plugins/widgets/live.leak/element/live.leak.element',
    'plugins/widgets/live.leak/element/live.leak.preferences.element',
    'plugins/widgets/live.leak/element/live.leak.rules.element'
], function defineLiveLeakView(BaseView, Header, Footer, LiveLeakElement, LiveLeakPreferencesElement, LiveLeakRulesElement) {

    /**
     * Define view
     * @class LiveLeakView
     * @extends BaseView
     * @constructor
     */
    var LiveLeakView = function LiveLeakView() {
    };

    return LiveLeakView.extend('LiveLeakView', {

        /**
         * Render LiveLeak element
         * @memberOf LiveLeakView
         */
        renderLiveLeak: function renderLiveLeak() {

            this.header(Header, this.get$container());

            /**
             * Define $liveleak
             * @type {LiveLeakElement}
             */
            this.elements.$liveleak = new LiveLeakElement(this, {
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
         * @memberOf LiveLeakView
         * @returns {LiveLeakPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define LiveLeak Preferences Element
             * @type {LiveLeakPreferencesElement}
             */
            this.elements.$preferences = new LiveLeakPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf LiveLeakView
         * @param widgetRules
         * @param contentRules
         * @returns {LiveLeakRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define LiveLeak Rules Element
             * @type {LiveLeakRulesElement}
             */
            this.elements.$rules = new LiveLeakRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render LiveLeak
         * @memberOf LiveLeakView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLiveLeak.bind(this)
            );
        }

    }, BaseView.prototype)

});
