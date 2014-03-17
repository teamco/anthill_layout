/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function definePagePermission(BasePermission) {

    /**
     * Define Permissions
     * @extends BasePermission
     * @class PagePermission
     * @constructor
     */
    var PagePermission = function PagePermission() {

    };

    return PagePermission.extend('PagePermission', {

    }, BasePermission.prototype);
});