/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base',
    'modules/api'
], function defineWidgetAPI(Base, BaseAPI) {

    /**
     * Define Widget API
     * @constructor
     */
    var API = function API() {

    };

    return API.extend({

    }, Base, BaseAPI.prototype);
});