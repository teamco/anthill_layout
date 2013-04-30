/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function defineWorkspace(Base, BaseElement) {

    var Workspace = function Workspace(view, opts) {
        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return Workspace.extend({

    }, Base, BaseElement.prototype);
});