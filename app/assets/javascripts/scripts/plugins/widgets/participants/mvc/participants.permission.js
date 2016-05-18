/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineParticipantsPermission(BasePermission) {

    /**
     * Define Permissions
     * @class ParticipantsPermission
     * @constructor
     * @extends BasePermission
     */
    var ParticipantsPermission = function ParticipantsPermission() {
    };

    return ParticipantsPermission.extend(
        'ParticipantsPermission', {}, 
        BasePermission.prototype
    );
});
