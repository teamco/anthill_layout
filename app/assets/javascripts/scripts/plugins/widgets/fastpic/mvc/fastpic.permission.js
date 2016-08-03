/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineFastpicPermission(BasePermission) {

    /**
     * Define Permissions
     * @class FastpicPermission
     * @constructor
     * @extends BasePermission
     */
    var FastpicPermission = function FastpicPermission() {
    };

    return FastpicPermission.extend(
        'FastpicPermission', {}, 
        BasePermission.prototype
    );
});
