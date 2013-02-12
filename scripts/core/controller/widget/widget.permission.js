/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/permission'
], function defineWidgetPermission(Base, BasePermission) {
    var Permission = function Permission(scope) {

        this.scope = scope;

        var base = this.base,
            permission = base.define(this.scope.config.permission, {}, true);

        this.capability = {
            drag: base.defineBoolean(permission.drag, true, true),
            resize: base.defineBoolean(permission.resize, true, true)
        };

    };

    return Permission.extend({

    }, Base, BasePermission.prototype);
});