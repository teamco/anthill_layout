/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'config/anthill',
    'plugins/plugin'
], function defineSiteController(AntHill, PluginBase) {

    /**
     * Define site controller
     * @class SiteController
     * @extends AntHill
     * @extends PluginController
     * @constructor
     */
    var SiteController = function SiteController() {
    };

    return SiteController.extend('SiteController', {


    }, AntHill.prototype, PluginBase.prototype);
});