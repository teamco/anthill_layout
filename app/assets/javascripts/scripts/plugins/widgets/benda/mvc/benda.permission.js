/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineBendaPermission(BasePermission) {

    /**
     * Define Permissions
     * @class BendaPermission
     * @constructor
     * @extends BasePermission
     */
    var BendaPermission = function BendaPermission() {
    };

    return BendaPermission.extend(
        'BendaPermission', {}, 
        BasePermission.prototype
    );
});
