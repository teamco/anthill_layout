/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePostToolPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PostToolPermission
     * @constructor
     * @extends BasePermission
     */
    var PostToolPermission = function PostToolPermission() {

    };

    return PostToolPermission.extend('PostToolPermission', {

    }, BasePermission.prototype);
});