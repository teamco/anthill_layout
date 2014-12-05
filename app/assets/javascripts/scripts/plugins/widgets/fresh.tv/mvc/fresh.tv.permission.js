/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineFreshTvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class FreshTvPermission
     * @constructor
     * @extends BasePermission
     */
    var FreshTvPermission = function FreshTvPermission() {

    };

    return FreshTvPermission.extend('FreshTvPermission', {

    }, BasePermission.prototype);
});
