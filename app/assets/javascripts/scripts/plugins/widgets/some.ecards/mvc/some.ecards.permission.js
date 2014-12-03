/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineSomeEcardsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class SomeEcardsPermission
     * @constructor
     * @extends BasePermission
     */
    var SomeEcardsPermission = function SomeEcardsPermission() {

    };

    return SomeEcardsPermission.extend('SomeEcardsPermission', {

    }, BasePermission.prototype);
});
