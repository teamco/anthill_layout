/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSyntaxHighlighterPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SyntaxHighlighterPermission
     * @constructor
     * @extends BasePermission
     */
    var SyntaxHighlighterPermission = function SyntaxHighlighterPermission() {

    };

    return SyntaxHighlighterPermission.extend('SyntaxHighlighterPermission', {

    }, BasePermission.prototype);
});
