/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineImagePermission(BasePermission) {

    /**
     * Define Permissions
     * @class ImagePermission
     * @constructor
     * @extends BasePermission
     */
    var ImagePermission = function ImagePermission() {

    };

    return ImagePermission.extend('ImagePermission', {

    }, BasePermission.prototype);
});