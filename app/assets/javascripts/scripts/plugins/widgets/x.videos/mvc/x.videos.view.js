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
    'plugins/widgets/x.videos/element/x.videos.element',
    'plugins/widgets/x.videos/element/x.videos.preferences.element',
    'plugins/widgets/x.videos/element/x.videos.rules.element'
], function defineXVideosView(BaseView, Header, Footer, XVideosElement, XVideosPreferencesElement, XVideosRulesElement) {

    /**
     * Define view
     * @class XVideosView
     * @extends BaseView
     * @constructor
     */
    var XVideosView = function XVideosView() {
    };

    return XVideosView.extend('XVideosView', {

        /**
         * Render xvideos element
         * @memberOf XVideosView
         */
        renderXVideos: function renderXVideos() {

            this.header(Header, this.get$container());

            /**
             * Define $xvideos
             * @type {XVideosElement}
             */
            this.elements.$xvideos = new XVideosElement(this, {
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
         * @memberOf XVideosView
         * @returns {XVideosPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define XVideos Preferences Element
             * @type {XVideosPreferencesElement}
             */
            this.elements.$preferences = new XVideosPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf XVideosView
         * @param widgetRules
         * @param contentRules
         * @returns {XVideosRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define XVideos Rules Element
             * @type {XVideosRulesElement}
             */
            this.elements.$rules = new XVideosRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render xvideos
         * @memberOf XVideosView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderXVideos.bind(this)
            );
        }

    }, BaseView.prototype)

});
