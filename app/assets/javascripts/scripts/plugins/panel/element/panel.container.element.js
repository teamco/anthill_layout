/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePanelContainerElement(BaseElement) {

    /**
     * Define Panel Container Element
     * @param view
     * @param opts
     * @returns {PanelContainerElement}
     * @constructor
     * @class PanelContainerElement
     * @extends BaseElement
     */
    var PanelContainerElement = function PanelContainerElement(view, opts) {

        this._config(view, opts, $(this.getTemplate())).build({
            $container: opts.$container,
            destroy: true
        });

        return this;
    };

    return PanelContainerElement.extend('PanelContainerElement', {

        /**
         * Define template
         * @memberOf PanelContainerElement
         * @returns {string}
         */
        getTemplate: function getTemplate() {
            return [
                '<nav class="navbar-default navbar-static-side" role="navigation">',
                '<div class="sidebar-collapse">',
                '<ul class="nav">',
                '<li class="nav-header">',
                '<div class="profile-element text-center">',
                '<h1 class="logo-element"></h1></div>',
                '<div class="logo-element"></div>',
                '</li></ul></div></nav>'
            ].join('');
        },

        /**
         * Define content container
         * @memberOf PanelContainerElement
         * @returns {*}
         */
        getContentContainer: function() {
            return this.$.find('ul.nav');
        },

        /**
         * Define long header wrapper
         * @memberOf PanelContainerElement
         * @param {string} text
         * @returns {*}
         */
        setLongHeader: function getLongHeaderWrapper(text) {
            this.$.find('h1.logo-element').text(text);
        },

        /**
         * Define short header wrapper
         * @memberOf PanelContainerElement
         * @param {string} text
         * @returns {*}
         */
        setShortHeader: function getShortHeaderWrapper(text) {
            this.$.find('div.logo-element').text(text);
        },

        /**
         * Toggle open class
         * @param {Boolean} open
         * @memberOf PanelContainerElement
         */
        opened: function opened(open) {
            open ?
                this.$.addClass('close') :
                this.$.removeClass('close');
        }

    }, BaseElement.prototype);
});