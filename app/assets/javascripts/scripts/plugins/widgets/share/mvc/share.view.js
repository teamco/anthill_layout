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
    'plugins/widgets/share/element/share.element',
    'plugins/widgets/share/element/share.preferences.element',
    'plugins/widgets/share/element/share.rules.element'
], function defineShareView(BaseView, Header, Footer, ShareElement, SharePreferencesElement, ShareRulesElement) {

    /**
     * Define view
     * @class ShareView
     * @extends BaseView
     * @constructor
     */
    var ShareView = function ShareView() {
    };

    return ShareView.extend('ShareView', {

        /**
         * Render share element
         * @memberOf ShareView
         */
        renderShare: function renderShare() {

            this.header(Header, this.get$container());

            /**
             * Define $share
             * @type {ShareElement}
             */
            this.elements.$share = new ShareElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf ShareView
         * @returns {SharePreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Share Preferences Element
             * @type {SharePreferencesElement}
             */
            this.elements.$preferences = new SharePreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf ShareView
         * @param widgetRules
         * @param contentRules
         * @returns {ShareRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Share Rules Element
             * @type {ShareRulesElement}
             */
            this.elements.$rules = new ShareRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render share
         * @memberOf ShareView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderShare.bind(this)
            );
        }

    }, BaseView.prototype)

});