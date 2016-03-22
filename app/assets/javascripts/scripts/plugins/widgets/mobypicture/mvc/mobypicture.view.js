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
    'plugins/widgets/mobypicture/element/mobypicture.element',
    'plugins/widgets/mobypicture/element/mobypicture.preferences.element',
    'plugins/widgets/mobypicture/element/mobypicture.rules.element'
], function defineMobypictureView(BaseView, Header, Footer, MobypictureElement, MobypicturePreferencesElement, MobypictureRulesElement) {

    /**
     * Define view
     * @class MobypictureView
     * @extends BaseView
     * @constructor
     */
    var MobypictureView = function MobypictureView() {
    };

    return MobypictureView.extend('MobypictureView', {

        /**
         * Render mobypicture element
         * @memberOf MobypictureView
         */
        renderMobypicture: function renderMobypicture() {

            this.header(Header, this.get$container());

            /**
             * Define $mobypicture
             * @type {MobypictureElement}
             */
            this.elements.$mobypicture = new MobypictureElement(this, {
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
         * @memberOf MobypictureView
         * @returns {MobypicturePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Mobypicture Preferences Element
             * @type {MobypicturePreferencesElement}
             */
            this.elements.$preferences = new MobypicturePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf MobypictureView
         * @param widgetRules
         * @param contentRules
         * @returns {MobypictureRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define Mobypicture Rules Element
             * @type {MobypictureRulesElement}
             */
            this.elements.$rules = new MobypictureRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render mobypicture
         * @memberOf MobypictureView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMobypicture.bind(this)
            );
        }

    }, BaseView.prototype)

});
