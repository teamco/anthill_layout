/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineAnimotoPermission(BasePermission) {

    /**
     * Define Permissions
     * @class AnimotoPermission
     * @constructor
     * @extends BasePermission
     */
    var AnimotoPermission = function AnimotoPermission() {

    };

    return AnimotoPermission.extend('AnimotoPermission', {

    }, BasePermission.prototype);
});
