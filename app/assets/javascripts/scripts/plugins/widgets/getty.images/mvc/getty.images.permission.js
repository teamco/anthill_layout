/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineGettyImagesPermission(BasePermission) {

    /**
     * Define Permissions
     * @class GettyImagesPermission
     * @constructor
     * @extends BasePermission
     */
    var GettyImagesPermission = function GettyImagesPermission() {
    };

    return GettyImagesPermission.extend(
        'GettyImagesPermission', {}, 
        BasePermission.prototype
    );
});
