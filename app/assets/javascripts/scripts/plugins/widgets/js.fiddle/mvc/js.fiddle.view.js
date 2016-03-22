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
         * @memberOf JsFiddleView
         */
        renderJsFiddle: function renderJsFiddle() {

            this.header(Header, this.get$container());

            /**
             * Define $jsfiddle
             * @type {JsFiddleElement}
             */
            this.elements.$jsfiddle = new JsFiddleElement(this, {
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
         * @memberOf JsFiddleView
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

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf JsFiddleView
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

            return this.get$rules();
        },

        /**
         * Render jsfiddle
         * @memberOf JsFiddleView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderJsFiddle.bind(this)
            );
        }

    }, BaseView.prototype)

});
