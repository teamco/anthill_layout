/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/empty/element/empty.element',
    'plugins/widgets/empty/element/empty.preferences.element'
], function defineEmptyView(BaseView, Header, Footer, EmptyElement, EmptyPreferencesElement) {

    /**
     * Define view
     * @class EmptyView
     * @extends BaseView
     * @constructor
     */
    var EmptyView = function EmptyView() {
    };

    return EmptyView.extend('EmptyView', {

        /**
         * Render empty element
         * @member EmptyView
         */
        renderEmpty: function renderEmpty() {

            this.header(Header, this.elements.$container);

            /**
             * Define $empty
             * @type {EmptyElement}
             */
            this.elements.$empty = new EmptyElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render Prefs
         * @member EmptyView
         * @returns {EmptyPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Empty Preferences Element
             * @type {EmptyPreferencesElement}
             */
            this.elements.$preferences = new EmptyPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render empty
         * @member EmptyView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEmpty.bind(this)
            );
        }

    }, BaseView.prototype)

});