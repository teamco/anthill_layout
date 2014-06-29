/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePetradarPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PetradarPermission
     * @constructor
     * @extends BasePermission
     */
    var PetradarPermission = function PetradarPermission() {

    };

    return PetradarPermission.extend('PetradarPermission', {

    }, BasePermission.prototype);
});