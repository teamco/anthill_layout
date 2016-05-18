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
    'plugins/widgets/join.us/element/join.us.element',
    'plugins/widgets/join.us/element/join.us.preferences.element',
    'plugins/widgets/join.us/element/join.us.rules.element'
], function defineJoinUsView(BaseView, Header, Footer, JoinUsElement, JoinUsPreferencesElement, JoinUsRulesElement) {

    /**
     * Define view
     * @class JoinUsView
     * @extends BaseView
     * @constructor
     */
    var JoinUsView = function JoinUsView() {
    };

    return JoinUsView.extend('JoinUsView', {

        /**
         * Render JoinUs element
         * @memberOf JoinUsView
         */
        renderJoinUs: function renderJoinUs() {

            this.header(Header, this.get$container());

            /**
             * Define $joinus
             * @type {JoinUsElement}
             */
            this.elements.$joinus = new JoinUsElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf JoinUsView
         * @returns {JoinUsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define JoinUs Preferences Element
             * @type {JoinUsPreferencesElement}
             */
            this.elements.$preferences = new JoinUsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf JoinUsView
         * @param widgetRules
         * @param contentRules
         * @returns {JoinUsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define JoinUs Rules Element
             * @type {JoinUsRulesElement}
             */
            this.elements.$rules = new JoinUsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render JoinUs
         * @memberOf JoinUsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderJoinUs.bind(this)
            );
        }

    }, BaseView.prototype);
});
