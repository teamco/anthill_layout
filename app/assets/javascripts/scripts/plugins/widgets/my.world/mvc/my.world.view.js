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
    'plugins/widgets/my.world/element/my.world.element',
    'plugins/widgets/my.world/element/my.world.preferences.element',
    'plugins/widgets/my.world/element/my.world.rules.element'
], function defineMyWorldView(BaseView, Header, Footer, MyWorldElement, MyWorldPreferencesElement, MyWorldRulesElement) {

    /**
     * Define view
     * @class MyWorldView
     * @extends BaseView
     * @constructor
     */
    var MyWorldView = function MyWorldView() {
    };

    return MyWorldView.extend('MyWorldView', {

        /**
         * Render myworld element
         * @memberOf MyWorldView
         */
        renderMyWorld: function renderMyWorld() {

            this.header(Header, this.get$container());

            /**
             * Define $myworld
             * @type {MyWorldElement}
             */
            this.elements.$myworld = new MyWorldElement(this, {
                $container: this.get$container(),
                id: this.createUUID()
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf MyWorldView
         * @returns {MyWorldPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define MyWorld Preferences Element
             * @type {MyWorldPreferencesElement}
             */
            this.elements.$preferences = new MyWorldPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf MyWorldView
         * @param widgetRules
         * @param contentRules
         * @returns {MyWorldRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define data
             * @type {*|{}}
             */
            var data = this.controller.getRules();

            /**
             * Define MyWorld Rules Element
             * @type {MyWorldRulesElement}
             */
            this.elements.$rules = new MyWorldRulesElement(this, {
                data: data,
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render myworld
         * @memberOf MyWorldView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMyWorld.bind(this)
            );
        }

    }, BaseView.prototype)

});
