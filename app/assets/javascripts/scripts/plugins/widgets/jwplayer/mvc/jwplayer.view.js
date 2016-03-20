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
    'plugins/widgets/jwplayer/element/jwplayer.element',
    'plugins/widgets/jwplayer/element/jwplayer.preferences.element',
    'plugins/widgets/jwplayer/element/jwplayer.rules.element'
], function defineJwplayerView(BaseView, Header, Footer, JwplayerElement, JwplayerPreferencesElement, JwplayerRulesElement) {

    /**
     * Define view
     * @class JwplayerView
     * @extends BaseView
     * @constructor
     */
    var JwplayerView = function JwplayerView() {
    };

    return JwplayerView.extend('JwplayerView', {

        /**
         * Render jwplayer element
         * @memberOf JwplayerView
         */
        renderJwplayer: function renderJwplayer() {

            this.header(Header, this.getElementContainer());

            /**
             * Define $jwplayer
             * @type {JwplayerElement}
             */
            this.elements.$jwplayer = new JwplayerElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.getElementContainer());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf JwplayerView
         * @returns {JwplayerPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Jwplayer Preferences Element
             * @type {JwplayerPreferencesElement}
             */
            this.elements.$preferences = new JwplayerPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf JwplayerView
         * @param widgetRules
         * @param contentRules
         * @returns {JwplayerRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Jwplayer Rules Element
             * @type {JwplayerRulesElement}
             */
            this.elements.$rules = new JwplayerRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render jwplayer
         * @memberOf JwplayerView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderJwplayer.bind(this)
            );
        }

    }, BaseView.prototype)

});