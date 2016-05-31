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
    'plugins/widgets/skype/element/skype.element',
    'plugins/widgets/skype/element/skype.preferences.element',
    'plugins/widgets/skype/element/skype.rules.element'
], function defineSkypeView(BaseView, Header, Footer, SkypeElement, SkypePreferencesElement, SkypeRulesElement) {

    /**
     * Define view
     * @class SkypeView
     * @extends BaseView
     * @constructor
     */
    var SkypeView = function SkypeView() {
    };

    return SkypeView.extend('SkypeView', {

        /**
         * Render Skype element
         * @memberOf SkypeView
         */
        renderSkype: function renderSkype() {

            this.header(Header, this.get$container());

            /**
             * Define $skype
             * @type {SkypeElement}
             */
            this.elements.$skype = new SkypeElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SkypeView
         * @returns {SkypePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Skype Preferences Element
             * @type {SkypePreferencesElement}
             */
            this.elements.$preferences = new SkypePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SkypeView
         * @param widgetRules
         * @param contentRules
         * @returns {SkypeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Skype Rules Element
             * @type {SkypeRulesElement}
             */
            this.elements.$rules = new SkypeRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render Skype
         * @memberOf SkypeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSkype.bind(this)
            );
        }

    }, BaseView.prototype);
});
