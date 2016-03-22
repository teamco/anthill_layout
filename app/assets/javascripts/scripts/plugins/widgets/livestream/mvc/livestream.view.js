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
    'plugins/widgets/livestream/element/livestream.element',
    'plugins/widgets/livestream/element/livestream.preferences.element',
    'plugins/widgets/livestream/element/livestream.rules.element'
], function defineLivestreamView(BaseView, Header, Footer, LivestreamElement, LivestreamPreferencesElement, LivestreamRulesElement) {

    /**
     * Define view
     * @class LivestreamView
     * @extends BaseView
     * @constructor
     */
    var LivestreamView = function LivestreamView() {
    };

    return LivestreamView.extend('LivestreamView', {

        /**
         * Render livestream element
         * @memberOf LivestreamView
         */
        renderLivestream: function renderLivestream() {

            this.header(Header, this.get$container());

            /**
             * Define $livestream
             * @type {LivestreamElement}
             */
            this.elements.$livestream = new LivestreamElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf LivestreamView
         * @returns {LivestreamPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Livestream Preferences Element
             * @type {LivestreamPreferencesElement}
             */
            this.elements.$preferences = new LivestreamPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf LivestreamView
         * @param widgetRules
         * @param contentRules
         * @returns {LivestreamRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Livestream Rules Element
             * @type {LivestreamRulesElement}
             */
            this.elements.$rules = new LivestreamRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render livestream
         * @memberOf LivestreamView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderLivestream.bind(this)
            );
        }

    }, BaseView.prototype)

});
