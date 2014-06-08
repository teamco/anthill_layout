/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function definePageDataPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PageDataPermission
     * @constructor
     * @extends BasePermission
     */
    var PageDataPermission = function PageDataPermission() {

    };

    return PageDataPermission.extend('PageDataPermission', {

    }, BasePermission.prototype);
});