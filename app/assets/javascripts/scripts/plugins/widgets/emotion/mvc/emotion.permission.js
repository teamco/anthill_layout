/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineEmotionPermission(BasePermission) {

    /**
     * Define Permissions
     * @class EmotionPermission
     * @constructor
     * @extends BasePermission
     */
    var EmotionPermission = function EmotionPermission() {
    };

    return EmotionPermission.extend(
        'EmotionPermission', {}, 
        BasePermission.prototype
    );
});
