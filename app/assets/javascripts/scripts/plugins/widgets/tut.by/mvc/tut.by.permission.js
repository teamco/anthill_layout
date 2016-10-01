/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineTutByPermission(BasePermission) {

    /**
     * Define Permissions
     * @class TutByPermission
     * @constructor
     * @extends BasePermission
     */
    var TutByPermission = function TutByPermission() {
    };

    return TutByPermission.extend(
        'TutByPermission', {}, 
        BasePermission.prototype
    );
});
