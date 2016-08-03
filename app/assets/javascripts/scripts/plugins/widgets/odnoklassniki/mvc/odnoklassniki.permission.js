/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineOdnoklassnikiPermission(BasePermission) {

    /**
     * Define Permissions
     * @class OdnoklassnikiPermission
     * @constructor
     * @extends BasePermission
     */
    var OdnoklassnikiPermission = function OdnoklassnikiPermission() {
    };

    return OdnoklassnikiPermission.extend(
        'OdnoklassnikiPermission', {}, 
        BasePermission.prototype
    );
});
