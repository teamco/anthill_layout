/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineFacebookEmbeddedPostsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class FacebookEmbeddedPostsPermission
     * @constructor
     * @extends BasePermission
     */
    var FacebookEmbeddedPostsPermission = function FacebookEmbeddedPostsPermission() {
    };

    return FacebookEmbeddedPostsPermission.extend(
        'FacebookEmbeddedPostsPermission', {}, 
        BasePermission.prototype
    );
});
