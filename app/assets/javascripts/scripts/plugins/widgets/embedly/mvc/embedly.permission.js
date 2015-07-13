/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineEmbedlyPermission(BasePermission) {

    /**
     * Define Permissions
     * @class EmbedlyPermission
     * @constructor
     * @extends BasePermission
     */
    var EmbedlyPermission = function EmbedlyPermission() {

    };

    return EmbedlyPermission.extend('EmbedlyPermission', {

    }, BasePermission.prototype);
});
