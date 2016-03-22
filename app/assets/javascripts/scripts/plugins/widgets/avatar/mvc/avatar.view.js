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
    'plugins/widgets/avatar/element/avatar.element',
    'plugins/widgets/avatar/element/avatar.preferences.element',
    'plugins/widgets/avatar/element/avatar.rules.element'
], function defineAvatarView(BaseView, Header, Footer, AvatarElement, AvatarPreferencesElement, AvatarRulesElement) {

    /**
     * Define view
     * @class AvatarView
     * @extends BaseView
     * @constructor
     */
    var AvatarView = function AvatarView() {
    };

    return AvatarView.extend('AvatarView', {

        /**
         * Render avatar element
         * @memberOf AvatarView
         */
        renderAvatar: function renderAvatar() {

            this.header(Header, this.get$container());

            /**
             * Define $avatar
             * @type {AvatarElement}
             */
            this.elements.$avatar = new AvatarElement(this, {
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
         * @memberOf AvatarView
         * @returns {AvatarPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Avatar Preferences Element
             * @type {AvatarPreferencesElement}
             */
            this.elements.$preferences = new AvatarPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @memberOf AvatarView
         * @param widgetRules
         * @param contentRules
         * @returns {AvatarRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Avatar Rules Element
             * @type {AvatarRulesElement}
             */
            this.elements.$rules = new AvatarRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        /**
         * Render avatar
         * @memberOf AvatarView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderAvatar.bind(this)
            );
        }

    }, BaseView.prototype)

});