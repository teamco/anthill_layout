/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function definePagesPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PagesPermission
     * @constructor
     * @extends BasePermission
     */
    var PagesPermission = function PagesPermission() {

    };

    return PagesPermission.extend('PagesPermission', {

    }, BasePermission.prototype);
});