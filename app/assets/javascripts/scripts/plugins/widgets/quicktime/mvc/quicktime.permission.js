/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineQuicktimePermission(BasePermission) {

    /**
     * Define Permissions
     * @class QuicktimePermission
     * @constructor
     * @extends BasePermission
     */
    var QuicktimePermission = function QuicktimePermission() {

    };

    return QuicktimePermission.extend('QuicktimePermission', {

    }, BasePermission.prototype);
});