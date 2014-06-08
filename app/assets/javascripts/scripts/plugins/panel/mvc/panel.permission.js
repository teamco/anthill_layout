/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineGalleryPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PanelPermission
     * @constructor
     * @extends BasePermission
     */
    var PanelPermission = function PanelPermission() {

    };

    return PanelPermission.extend('PanelPermission', {

    }, BasePermission.prototype);
});