/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineDotsubPermission(BasePermission) {

    /**
     * Define Permissions
     * @class DotsubPermission
     * @constructor
     * @extends BasePermission
     */
    var DotsubPermission = function DotsubPermission() {
    };

    return DotsubPermission.extend(
        'DotsubPermission', {}, 
        BasePermission.prototype
    );
});
