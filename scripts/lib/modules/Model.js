/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

var Model = function Model() {

};

jQuery.extend(true, Model.prototype, {

    getUUID: function getUUID(package) {
        return package.config.uuid;
    }

});