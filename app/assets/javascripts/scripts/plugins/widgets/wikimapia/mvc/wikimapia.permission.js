/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineWikimapiaPermission(BasePermission) {

    /**
     * Define Permissions
     * @class WikimapiaPermission
     * @constructor
     * @extends BasePermission
     */
    var WikimapiaPermission = function WikimapiaPermission() {
    };

    return WikimapiaPermission.extend(
        'WikimapiaPermission', {}, 
        BasePermission.prototype
    );
});
