/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/permission'
], function defineTextEditorPermission(BasePermission) {

    /**
     * Define Permissions
     * @class TextEditorPermission
     * @constructor
     * @extends BasePermission
     */
    var TextEditorPermission = function TextEditorPermission() {

    };

    return TextEditorPermission.extend('TextEditorPermission', {

    }, BasePermission.prototype);
});