/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineCoubPermission(BasePermission) {

    /**
     * Define Permissions
     * @class CoubPermission
     * @constructor
     * @extends BasePermission
     */
    var CoubPermission = function CoubPermission() {

    };

    return CoubPermission.extend('CoubPermission', {

    }, BasePermission.prototype);
});
