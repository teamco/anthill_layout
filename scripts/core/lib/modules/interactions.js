/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/21/13
 * Time: 4:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function defineInteractions(Base) {

    var Interactions = function Interactions() {
    };

    return Interactions.extend({
        checkPermission: function checkPermission() {
            this.scope.permission.check({
                capability: this.constructor.getConstructorName().toLowerCase(),
                callback: this.init.bind(this)
            });
        }

    }, Base);

});