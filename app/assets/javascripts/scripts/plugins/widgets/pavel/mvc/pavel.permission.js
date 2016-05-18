/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePavelPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PavelPermission
     * @constructor
     * @extends BasePermission
     */
    var PavelPermission = function PavelPermission() {
    };

    return PavelPermission.extend(
        'PavelPermission', {}, 
        BasePermission.prototype
    );
});
