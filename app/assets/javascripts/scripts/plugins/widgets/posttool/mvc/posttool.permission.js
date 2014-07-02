/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePosttoolPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PosttoolPermission
     * @constructor
     * @extends BasePermission
     */
    var PosttoolPermission = function PosttoolPermission() {

    };

    return PosttoolPermission.extend('PosttoolPermission', {

    }, BasePermission.prototype);
});