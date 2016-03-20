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
    'plugins/widgets/one.plus.one/element/one.plus.one.element',
    'plugins/widgets/one.plus.one/element/one.plus.one.preferences.element',
    'plugins/widgets/one.plus.one/element/one.plus.one.rules.element'
], function defineOnePlusOneView(BaseView, Header, Footer, OnePlusOneElement, OnePlusOnePreferencesElement, OnePlusOneRulesElement) {

    /**
     * Define view
     * @class OnePlusOneView
     * @extends BaseView
     * @constructor
     */
    var OnePlusOneView = function OnePlusOneView() {
    };

    return OnePlusOneView.extend('OnePlusOneView', {

        /**
         * Render $oneplusone element
         * @memberOf OnePlusOneView
         */
        renderOnePlusOne: function renderOnePlusOne() {

            this.header(Header, this.get$container());

            /**
             * Define $oneplusone
             * @type {OnePlusOneElement}
             */
            this.elements.$oneplusone = new OnePlusOneElement(this, {
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
         * @memberOf OnePlusOneView
         * @returns {OnePlusOnePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define OnePlusOne Preferences Element
             * @type {OnePlusOnePreferencesElement}
             */
            this.elements.$preferences = new OnePlusOnePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf OnePlusOneView
         * @param widgetRules
         * @param contentRules
         * @returns {OnePlusOneRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define OnePlusOne Rules Element
             * @type {OnePlusOneRulesElement}
             */
            this.elements.$rules = new OnePlusOneRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render $oneplusone
         * @memberOf OnePlusOneView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderOnePlusOne.bind(this)
            );
        }

    }, BaseView.prototype)

});
