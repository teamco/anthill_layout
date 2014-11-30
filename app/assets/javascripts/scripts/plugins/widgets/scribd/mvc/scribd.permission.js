/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineScribdPermission(BasePermission) {

    /**
     * Define Permissions
     * @class ScribdPermission
     * @constructor
     * @extends BasePermission
     */
    var ScribdPermission = function ScribdPermission() {

    };

    return ScribdPermission.extend('ScribdPermission', {

    }, BasePermission.prototype);
});
