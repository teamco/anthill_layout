/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineTinymcePermission(BasePermission) {

    /**
     * Define Permissions
     * @class TinymcePermission
     * @constructor
     * @extends BasePermission
     */
    var TinymcePermission = function TinymcePermission() {
    };

    return TinymcePermission.extend(
        'TinymcePermission', {}, 
        BasePermission.prototype
    );
});
