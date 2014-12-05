/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePremiereTvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PremiereTvPermission
     * @constructor
     * @extends BasePermission
     */
    var PremiereTvPermission = function PremiereTvPermission() {

    };

    return PremiereTvPermission.extend('PremiereTvPermission', {

    }, BasePermission.prototype);
});
