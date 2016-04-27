/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineCacooPermission(BasePermission) {

    /**
     * Define Permissions
     * @class CacooPermission
     * @constructor
     * @extends BasePermission
     */
    var CacooPermission = function CacooPermission() {
    };

    return CacooPermission.extend(
        'CacooPermission', {}, 
        BasePermission.prototype
    );
});
