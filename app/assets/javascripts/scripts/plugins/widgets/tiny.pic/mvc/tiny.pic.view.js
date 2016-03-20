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
    'plugins/widgets/tiny.pic/element/tiny.pic.element',
    'plugins/widgets/tiny.pic/element/tiny.pic.preferences.element',
    'plugins/widgets/tiny.pic/element/tiny.pic.rules.element'
], function defineTinyPicView(BaseView, Header, Footer, TinyPicElement, TinyPicPreferencesElement, TinyPicRulesElement) {

    /**
     * Define view
     * @class TinyPicView
     * @extends BaseView
     * @constructor
     */
    var TinyPicView = function TinyPicView() {
    };

    return TinyPicView.extend('TinyPicView', {

        /**
         * Render tinypic element
         * @memberOf TinyPicView
         */
        renderTinyPic: function renderTinyPic() {

            this.header(Header, this.getElementContainer());

            /**
             * Define $tinypic
             * @type {TinyPicElement}
             */
            this.elements.$tinypic = new TinyPicElement(this, {
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
         * @memberOf TinyPicView
         * @returns {TinyPicPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define TinyPic Preferences Element
             * @type {TinyPicPreferencesElement}
             */
            this.elements.$preferences = new TinyPicPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf TinyPicView
         * @param widgetRules
         * @param contentRules
         * @returns {TinyPicRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define TinyPic Rules Element
             * @type {TinyPicRulesElement}
             */
            this.elements.$rules = new TinyPicRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render tinypic
         * @memberOf TinyPicView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderTinyPic.bind(this)
            );
        }

    }, BaseView.prototype)

});
