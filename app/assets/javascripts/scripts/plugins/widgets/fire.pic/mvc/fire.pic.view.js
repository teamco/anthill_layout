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
    'plugins/widgets/fire.pic/element/fire.pic.element',
    'plugins/widgets/fire.pic/element/fire.pic.preferences.element',
    'plugins/widgets/fire.pic/element/fire.pic.rules.element'
], function defineFirePicView(BaseView, Header, Footer, FirePicElement, FirePicPreferencesElement, FirePicRulesElement) {

    /**
     * Define view
     * @class FirePicView
     * @extends BaseView
     * @constructor
     */
    var FirePicView = function FirePicView() {
    };

    return FirePicView.extend('FirePicView', {

        /**
         * Render firepic element
         * @memberOf FirePicView
         */
        renderFirePic: function renderFirePic() {

            this.header(Header, this.elements.$container);

            /**
             * Define $firepic
             * @type {FirePicElement}
             */
            this.elements.$firepic = new FirePicElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventManager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf FirePicView
         * @returns {FirePicPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define FirePic Preferences Element
             * @type {FirePicPreferencesElement}
             */
            this.elements.$preferences = new FirePicPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf FirePicView
         * @param widgetRules
         * @param contentRules
         * @returns {FirePicRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define FirePic Rules Element
             * @type {FirePicRulesElement}
             */
            this.elements.$rules = new FirePicRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render firepic
         * @memberOf FirePicView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventManager.eventList.successRendered,
                this.renderFirePic.bind(this)
            );
        }

    }, BaseView.prototype)

});
