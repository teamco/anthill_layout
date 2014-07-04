/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function definePetPassportPermission(BasePermission) {

    /**
     * Define Permissions
     * @class PetPassportPermission
     * @constructor
     * @extends BasePermission
     */
    var PetPassportPermission = function PetPassportPermission() {

    };

    return PetPassportPermission.extend('PetPassportPermission', {

    }, BasePermission.prototype);
});