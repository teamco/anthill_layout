/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineWordcampTvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class WordcampTvPermission
     * @constructor
     * @extends BasePermission
     */
    var WordcampTvPermission = function WordcampTvPermission() {

    };

    return WordcampTvPermission.extend('WordcampTvPermission', {

    }, BasePermission.prototype);
});
