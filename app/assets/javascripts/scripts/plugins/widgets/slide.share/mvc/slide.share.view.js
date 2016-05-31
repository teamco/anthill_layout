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
         * @memberOf SlideShareView
         */
        renderSlideShare: function renderSlideShare() {

            this.header(Header, this.get$container());

            /**
             * Define $slideshare
             * @type {SlideShareElement}
             */
            this.elements.$slideshare = new SlideShareElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf SlideShareView
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

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf SlideShareView
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

            return this.get$rules();
        },

        /**
         * Render SlideShare
         * @memberOf SlideShareView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderSlideShare.bind(this)
            );
        }

    }, BaseView.prototype)

});
