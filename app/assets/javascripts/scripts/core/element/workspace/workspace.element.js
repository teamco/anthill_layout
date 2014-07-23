/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineWorkspaceElement(BaseElement) {

    /**
     * Define Workspace Element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class WorkspaceElement
     * @extends BaseElement
     */
    var WorkspaceElement = function Workspace(view, opts) {
        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return WorkspaceElement.extend('WorkspaceElement', {

        /**
         * Set workspace width
         * @member WorkspaceElement
         * @param {number} width
         */
        setWidth: function setWidth(width) {

            var style = this.$.attr('class'),
                regex = /sw-\d{3,4}/;

            style = style.match(regex) ?
                style.replace(regex, 'sw-' + width) :
                style + ' sw-' + width;

            this.$.attr('class', style);
        },

        /**
         * Unset workspace width
         * @member WorkspaceElement
         */
        unsetWidth: function unserWidth() {
            this.$.attr(
                'class',
                this.$.attr('class').replace(/sw-\d{3,4}/, '')
            );
        }

    }, BaseElement.prototype);
});