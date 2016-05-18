/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineTitlePermission(BasePermission) {

    /**
     * Define Permissions
     * @class TitlePermission
     * @constructor
     * @extends BasePermission
     */
    var TitlePermission = function TitlePermission() {
    };

    return TitlePermission.extend(
        'TitlePermission', {}, 
        BasePermission.prototype
    );
});
