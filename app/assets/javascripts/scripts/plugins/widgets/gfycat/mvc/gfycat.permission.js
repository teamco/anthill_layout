/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineGfycatPermission(BasePermission) {

    /**
     * Define Permissions
     * @class GfycatPermission
     * @constructor
     * @extends BasePermission
     */
    var GfycatPermission = function GfycatPermission() {
    };

    return GfycatPermission.extend(
        'GfycatPermission', {}, 
        BasePermission.prototype
    );
});
