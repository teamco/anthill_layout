/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineFlickrPermission(BasePermission) {

    /**
     * Define Permissions
     * @class FlickrPermission
     * @constructor
     * @extends BasePermission
     */
    var FlickrPermission = function FlickrPermission() {

    };

    return FlickrPermission.extend('FlickrPermission', {

    }, BasePermission.prototype);
});
