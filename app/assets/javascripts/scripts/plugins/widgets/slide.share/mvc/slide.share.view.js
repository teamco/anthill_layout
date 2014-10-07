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
    'plugins/widgets/slide.share/element/slide.share.element',
    'plugins/widgets/slide.share/element/slide.share.preferences.element',
    'plugins/widgets/slide.share/element/slide.share.rules.element'
], function defineSlideShareView(BaseView, Header, Footer, SlideShareElement, SlideSharePreferencesElement, SlideShareRulesElement) {

    /**
     * Define view
     * @class SlideShareView
     * @extends BaseView
     * @constructor
     */
    var SlideShareView = function SlideShareView() {
    };

    return SlideShareView.extend('SlideShareView', {

        /**
         * Render SlideShare element
         * @member SlideShareView
         */
        renderSlideShare: function renderSlideShare() {

            this.header(Header, this.elements.$container);

            /**
             * Define $slideshare
             * @type {SlideShareElement}
             */
            this.elements.$slideshare = new SlideShareElement(this, {
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
         * @member SlideShareView
         * @returns {SlideSharePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define SlideShare Preferences Element
             * @type {SlideSharePreferencesElement}
             */
            this.elements.$preferences = new SlideSharePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member SlideShareView
         * @param widgetRules
         * @param contentRules
         * @returns {SlideShareRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define SlideShare Rules Element
             * @type {SlideShareRulesElement}
             */
            this.elements.$rules = new SlideShareRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render SlideShare
         * @member SlideShareView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSlideShare.bind(this)
            );
        }

    }, BaseView.prototype)

});
