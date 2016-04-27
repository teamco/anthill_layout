/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineCodepointsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class CodepointsPermission
     * @constructor
     * @extends BasePermission
     */
    var CodepointsPermission = function CodepointsPermission() {
    };

    return CodepointsPermission.extend(
        'CodepointsPermission', {}, 
        BasePermission.prototype
    );
});
