/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function definePageTabsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PageTabsPermission
     * @constructor
     * @extends BasePermission
     */
    var PageTabsPermission = function PageTabsPermission() {

    };

    return PageTabsPermission.extend('PageTabsPermission', {

    }, BasePermission.prototype);
});