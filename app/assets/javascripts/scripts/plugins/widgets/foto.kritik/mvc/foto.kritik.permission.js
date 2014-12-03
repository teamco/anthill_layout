/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineFotoKritikPermission(BasePermission) {

    /**
     * Define Permissions
     * @class FotoKritikPermission
     * @constructor
     * @extends BasePermission
     */
    var FotoKritikPermission = function FotoKritikPermission() {

    };

    return FotoKritikPermission.extend('FotoKritikPermission', {

    }, BasePermission.prototype);
});
