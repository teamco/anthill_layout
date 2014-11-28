/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineEspresoTvPermission(BasePermission) {

    /**
     * Define Permissions
     * @class EspresoTvPermission
     * @constructor
     * @extends BasePermission
     */
    var EspresoTvPermission = function EspresoTvPermission() {

    };

    return EspresoTvPermission.extend('EspresoTvPermission', {

    }, BasePermission.prototype);
});
