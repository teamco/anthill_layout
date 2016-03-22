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
    'plugins/widgets/twits/element/twits.element',
    'plugins/widgets/twits/element/twits.preferences.element',
    'plugins/widgets/twits/element/twits.rules.element'
], function defineTwitsView(BaseView, Header, Footer, TwitsElement, TwitsPreferencesElement, TwitsRulesElement) {

    /**
     * Define view
     * @class TwitsView
     * @extends BaseView
     * @constructor
     */
    var TwitsView = function TwitsView() {
    };

    return TwitsView.extend('TwitsView', {

        /**
         * Render twits element
         * @memberOf TwitsView
         */
        renderTwits: function renderTwits() {

            this.header(Header, this.get$container());

            /**
             * Define $twits
             * @type {TwitsElement}
             */
            this.elements.$twits = new TwitsElement(this, {
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
         * @memberOf TwitsView
         * @returns {TwitsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Twits Preferences Element
             * @type {TwitsPreferencesElement}
             */
            this.elements.$preferences = new TwitsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf TwitsView
         * @param widgetRules
         * @param contentRules
         * @returns {TwitsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Twits Rules Element
             * @type {TwitsRulesElement}
             */
            this.elements.$rules = new TwitsRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render twits
         * @memberOf TwitsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTwits.bind(this)
            );
        }

    }, BaseView.prototype)

});