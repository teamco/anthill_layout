/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineSiteModel(BaseModel) {

    /**
     * Define Site model
     * @extends BaseModel
     * @class SiteModel
     * @constructor
     */
    var SiteModel = function SiteModel() {

    };

    return SiteModel.extend('SiteModel', {

    }, BaseModel.prototype);
});