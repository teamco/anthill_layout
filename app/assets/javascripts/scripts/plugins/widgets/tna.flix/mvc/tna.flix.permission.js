/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineTnaFlixPermission(BasePermission) {

    /**
     * Define Permissions
     * @class TnaFlixPermission
     * @constructor
     * @extends BasePermission
     */
    var TnaFlixPermission = function TnaFlixPermission() {

    };

    return TnaFlixPermission.extend('TnaFlixPermission', {

    }, BasePermission.prototype);
});
