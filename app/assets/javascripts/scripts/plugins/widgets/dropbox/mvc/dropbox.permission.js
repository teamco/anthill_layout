/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineDropboxPermission(BasePermission) {

    /**
     * Define Permissions
     * @class DropboxPermission
     * @constructor
     * @extends BasePermission
     */
    var DropboxPermission = function DropboxPermission() {

    };

    return DropboxPermission.extend('DropboxPermission', {

    }, BasePermission.prototype);
});