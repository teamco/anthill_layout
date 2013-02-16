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
    /**
     * Define Permissions
     * @param scope
     * @constructor
     */
    var Permission = function Permission(scope) {

        this.scope = scope;
        this.capability = {};

        var base = this.base,
            permission = base.define(this.scope.config.permission, {}, true);

        this.setCapability(
            this.rulesList.draggable,
            base.defineBoolean(permission.draggable, true, true)
        );

        this.setCapability(
            this.rulesList.resizable,
            base.defineBoolean(permission.resizable, true, true)
        );

    };

    return Permission.extend({
        /**
         * List of Rules
         */
        rulesList: {
            draggable: 'draggable',
            resizable: 'resizable'
        }

    }, Base, BasePermission.prototype);
});