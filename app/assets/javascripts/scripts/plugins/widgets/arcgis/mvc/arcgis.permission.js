/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineArcgisPermission(BasePermission) {

    /**
     * Define Permissions
     * @class ArcgisPermission
     * @constructor
     * @extends BasePermission
     */
    var ArcgisPermission = function ArcgisPermission() {
    };

    return ArcgisPermission.extend(
        'ArcgisPermission', {}, 
        BasePermission.prototype
    );
});
