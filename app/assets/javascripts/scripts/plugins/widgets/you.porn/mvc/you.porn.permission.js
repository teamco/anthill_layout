/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineYouPornPermission(BasePermission) {

    /**
     * Define Permissions
     * @class YouPornPermission
     * @constructor
     * @extends BasePermission
     */
    var YouPornPermission = function YouPornPermission() {

    };

    return YouPornPermission.extend('YouPornPermission', {

    }, BasePermission.prototype);
});
