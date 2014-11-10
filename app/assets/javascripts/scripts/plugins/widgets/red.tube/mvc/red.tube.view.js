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
    'plugins/widgets/red.tube/element/red.tube.element',
    'plugins/widgets/red.tube/element/red.tube.preferences.element',
    'plugins/widgets/red.tube/element/red.tube.rules.element'
], function defineRedTubeView(BaseView, Header, Footer, RedTubeElement, RedTubePreferencesElement, RedTubeRulesElement) {

    /**
     * Define view
     * @class RedTubeView
     * @extends BaseView
     * @constructor
     */
    var RedTubeView = function RedTubeView() {
    };

    return RedTubeView.extend('RedTubeView', {

        /**
         * Render RedTube element
         * @member RedTubeView
         */
        renderRedTube: function renderRedTube() {

            this.header(Header, this.elements.$container);

            /**
             * Define $redtube
             * @type {RedTubeElement}
             */
            this.elements.$redtube = new RedTubeElement(this, {
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
         * @member RedTubeView
         * @returns {RedTubePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define RedTube Preferences Element
             * @type {RedTubePreferencesElement}
             */
            this.elements.$preferences = new RedTubePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member RedTubeView
         * @param widgetRules
         * @param contentRules
         * @returns {RedTubeRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define RedTube Rules Element
             * @type {RedTubeRulesElement}
             */
            this.elements.$rules = new RedTubeRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render RedTube
         * @member RedTubeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderRedTube.bind(this)
            );
        }

    }, BaseView.prototype)

});
