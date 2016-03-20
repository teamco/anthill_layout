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
    'plugins/widgets/lifestream/element/lifestream.element',
    'plugins/widgets/lifestream/element/lifestream.preferences.element',
    'plugins/widgets/lifestream/element/lifestream.rules.element'
], function defineLifestreamView(BaseView, Header, Footer, LifestreamElement, LifestreamPreferencesElement, LifestreamRulesElement) {

    /**
     * Define view
     * @class LifestreamView
     * @extends BaseView
     * @constructor
     */
    var LifestreamView = function LifestreamView() {
    };

    return LifestreamView.extend('LifestreamView', {

        /**
         * Render Lifestream element
         * @memberOf LifestreamView
         */
        renderLifestream: function renderLifestream() {

            this.header(Header, this.get$container());

            /**
             * Define $lifestream
             * @type {LifestreamElement}
             */
            this.elements.$lifestream = new LifestreamElement(this, {
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
         * @memberOf LifestreamView
         * @returns {LifestreamPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Lifestream Preferences Element
             * @type {LifestreamPreferencesElement}
             */
            this.elements.$preferences = new LifestreamPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf LifestreamView
         * @param widgetRules
         * @param contentRules
         * @returns {LifestreamRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Lifestream Rules Element
             * @type {LifestreamRulesElement}
             */
            this.elements.$rules = new LifestreamRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render Lifestream
         * @memberOf LifestreamView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLifestream.bind(this)
            );
        }

    }, BaseView.prototype)

});
