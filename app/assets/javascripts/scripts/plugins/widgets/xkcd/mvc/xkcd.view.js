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
    'plugins/widgets/xkcd/element/xkcd.element',
    'plugins/widgets/xkcd/element/xkcd.preferences.element',
    'plugins/widgets/xkcd/element/xkcd.rules.element'
], function defineXkcdView(BaseView, Header, Footer, XkcdElement, XkcdPreferencesElement, XkcdRulesElement) {

    /**
     * Define view
     * @class XkcdView
     * @extends BaseView
     * @constructor
     */
    var XkcdView = function XkcdView() {
    };

    return XkcdView.extend('XkcdView', {

        /**
         * Render xkcd element
         * @memberOf XkcdView
         */
        renderXkcd: function renderXkcd() {

            this.header(Header, this.get$container());

            /**
             * Define $xkcd
             * @type {XkcdElement}
             */
            this.elements.$xkcd = new XkcdElement(this, {
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
         * @memberOf XkcdView
         * @returns {XkcdPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Xkcd Preferences Element
             * @type {XkcdPreferencesElement}
             */
            this.elements.$preferences = new XkcdPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf XkcdView
         * @param widgetRules
         * @param contentRules
         * @returns {XkcdRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Xkcd Rules Element
             * @type {XkcdRulesElement}
             */
            this.elements.$rules = new XkcdRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render xkcd
         * @memberOf XkcdView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderXkcd.bind(this)
            );
        }

    }, BaseView.prototype)

});
