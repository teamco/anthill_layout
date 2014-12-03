/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePastebinPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PastebinPermission
     * @constructor
     * @extends BasePermission
     */
    var PastebinPermission = function PastebinPermission() {

    };

    return PastebinPermission.extend('PastebinPermission', {

    }, BasePermission.prototype);
});
