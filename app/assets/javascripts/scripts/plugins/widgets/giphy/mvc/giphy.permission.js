/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineGiphyPermission(BasePermission) {

    /**
     * Define Permissions
     * @class GiphyPermission
     * @constructor
     * @extends BasePermission
     */
    var GiphyPermission = function GiphyPermission() {

    };

    return GiphyPermission.extend('GiphyPermission', {

    }, BasePermission.prototype);
});
