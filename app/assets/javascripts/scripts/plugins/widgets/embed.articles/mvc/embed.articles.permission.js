/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineEmbedArticlesPermission(BasePermission) {

    /**
     * Define Permissions
     * @class EmbedArticlesPermission
     * @constructor
     * @extends BasePermission
     */
    var EmbedArticlesPermission = function EmbedArticlesPermission() {
    };

    return EmbedArticlesPermission.extend(
        'EmbedArticlesPermission', {}, 
        BasePermission.prototype
    );
});
