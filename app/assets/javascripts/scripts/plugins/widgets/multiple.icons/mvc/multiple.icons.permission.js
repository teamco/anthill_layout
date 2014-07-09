/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineMultipleIconsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class MultipleIconsPermission
     * @constructor
     * @extends BasePermission
     */
    var MultipleIconsPermission = function MultipleIconsPermission() {

    };

    return MultipleIconsPermission.extend('MultipleIconsPermission', {

    }, BasePermission.prototype);
});