/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSublimeVideoPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SublimeVideoPermission
     * @constructor
     * @extends BasePermission
     */
    var SublimeVideoPermission = function SublimeVideoPermission() {

    };

    return SublimeVideoPermission.extend('SublimeVideoPermission', {

    }, BasePermission.prototype);
});
