/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineIsnarePermission(BasePermission) {

    /**
     * Define Permissions
     * @class IsnarePermission
     * @constructor
     * @extends BasePermission
     */
    var IsnarePermission = function IsnarePermission() {

    };

    return IsnarePermission.extend('IsnarePermission', {

    }, BasePermission.prototype);
});
