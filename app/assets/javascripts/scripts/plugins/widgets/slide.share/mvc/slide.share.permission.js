/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSlideSharePermission(BasePermission) {

    /**
     * Define Permissions
     * @class SlideSharePermission
     * @constructor
     * @extends BasePermission
     */
    var SlideSharePermission = function SlideSharePermission() {

    };

    return SlideSharePermission.extend('SlideSharePermission', {

    }, BasePermission.prototype);
});
