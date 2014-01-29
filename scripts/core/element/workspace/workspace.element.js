/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function defineWorkspaceElement(BaseElement) {

    /**
     * Define Workspace Element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class WorkspaceElement
     */
    var WorkspaceElement = function Workspace(view, opts) {
        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return WorkspaceElement.extend({

    }, BaseElement.prototype);
});