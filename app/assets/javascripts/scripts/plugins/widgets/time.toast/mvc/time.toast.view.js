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
    'plugins/widgets/time.toast/element/time.toast.element',
    'plugins/widgets/time.toast/element/time.toast.preferences.element',
    'plugins/widgets/time.toast/element/time.toast.rules.element'
], function defineTimeToastView(BaseView, Header, Footer, TimeToastElement, TimeToastPreferencesElement, TimeToastRulesElement) {

    /**
     * Define view
     * @class TimeToastView
     * @extends BaseView
     * @constructor
     */
    var TimeToastView = function TimeToastView() {
    };

    return TimeToastView.extend('TimeToastView', {

        /**
         * Render timetoast element
         * @member TimeToastView
         */
        renderTimeToast: function renderTimeToast() {

            this.header(Header, this.elements.$container);

            /**
             * Define $timetoast
             * @type {TimeToastElement}
             */
            this.elements.$timetoast = new TimeToastElement(this, {
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
         * @member TimeToastView
         * @returns {TimeToastPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TimeToast Preferences Element
             * @type {TimeToastPreferencesElement}
             */
            this.elements.$preferences = new TimeToastPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member TimeToastView
         * @param widgetRules
         * @param contentRules
         * @returns {TimeToastRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define TimeToast Rules Element
             * @type {TimeToastRulesElement}
             */
            this.elements.$rules = new TimeToastRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render timetoast
         * @member TimeToastView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTimeToast.bind(this)
            );
        }

    }, BaseView.prototype)

});
