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
    'plugins/widgets/js.fiddle/element/js.fiddle.element',
    'plugins/widgets/js.fiddle/element/js.fiddle.preferences.element',
    'plugins/widgets/js.fiddle/element/js.fiddle.rules.element'
], function defineJsFiddleView(BaseView, Header, Footer, JsFiddleElement, JsFiddlePreferencesElement, JsFiddleRulesElement) {

    /**
     * Define view
     * @class JsFiddleView
     * @extends BaseView
     * @constructor
     */
    var JsFiddleView = function JsFiddleView() {
    };

    return JsFiddleView.extend('JsFiddleView', {

        /**
         * Render jsfiddle element
         * @member JsFiddleView
         */
        renderJsFiddle: function renderJsFiddle() {

            this.header(Header, this.elements.$container);

            /**
             * Define $jsfiddle
             * @type {JsFiddleElement}
             */
            this.elements.$jsfiddle = new JsFiddleElement(this, {
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
         * @member JsFiddleView
         * @returns {JsFiddlePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define JsFiddle Preferences Element
             * @type {JsFiddlePreferencesElement}
             */
            this.elements.$preferences = new JsFiddlePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member JsFiddleView
         * @param widgetRules
         * @param contentRules
         * @returns {JsFiddleRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define JsFiddle Rules Element
             * @type {JsFiddleRulesElement}
             */
            this.elements.$rules = new JsFiddleRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render jsfiddle
         * @member JsFiddleView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderJsFiddle.bind(this)
            );
        }

    }, BaseView.prototype)

});
