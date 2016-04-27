/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineNationalFilmBoardOfCanadaPermission(BasePermission) {

    /**
     * Define Permissions
     * @class NationalFilmBoardOfCanadaPermission
     * @constructor
     * @extends BasePermission
     */
    var NationalFilmBoardOfCanadaPermission = function NationalFilmBoardOfCanadaPermission() {
    };

    return NationalFilmBoardOfCanadaPermission.extend(
        'NationalFilmBoardOfCanadaPermission', {}, 
        BasePermission.prototype
    );
});
