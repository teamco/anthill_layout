/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineLaimTvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class LaimTvPermission
     * @constructor
     * @extends BasePermission
     */
    var LaimTvPermission = function LaimTvPermission() {
    };

    return LaimTvPermission.extend(
        'LaimTvPermission', {}, 
        BasePermission.prototype
    );
});
