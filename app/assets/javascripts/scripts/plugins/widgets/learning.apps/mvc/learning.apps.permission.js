/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineLearningAppsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class LearningAppsPermission
     * @constructor
     * @extends BasePermission
     */
    var LearningAppsPermission = function LearningAppsPermission() {
    };

    return LearningAppsPermission.extend(
        'LearningAppsPermission', {}, 
        BasePermission.prototype
    );
});
