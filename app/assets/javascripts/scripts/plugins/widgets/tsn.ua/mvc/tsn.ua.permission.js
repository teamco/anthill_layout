/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineTsnUaPermission(BasePermission) {

    /**
     * Define Permissions
     * @class TsnUaPermission
     * @constructor
     * @extends BasePermission
     */
    var TsnUaPermission = function TsnUaPermission() {

    };

    return TsnUaPermission.extend('TsnUaPermission', {

    }, BasePermission.prototype);
});
