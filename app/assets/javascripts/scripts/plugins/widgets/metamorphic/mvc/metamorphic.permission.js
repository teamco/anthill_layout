/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineMetamorphicPermission(BasePermission) {

    /**
     * Define Permissions
     * @class MetamorphicPermission
     * @constructor
     * @extends BasePermission
     */
    var MetamorphicPermission = function MetamorphicPermission() {
    };

    return MetamorphicPermission.extend(
        'MetamorphicPermission', {}, 
        BasePermission.prototype
    );
});
