/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineFlickrFeedsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class FlickrFeedsPermission
     * @constructor
     * @extends BasePermission
     */
    var FlickrFeedsPermission = function FlickrFeedsPermission() {

    };

    return FlickrFeedsPermission.extend('FlickrFeedsPermission', {

    }, BasePermission.prototype);
});
