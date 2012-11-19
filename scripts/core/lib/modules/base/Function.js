/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(['modules/base'], function defineBaseFunction(Base) {
    var BaseFunction = function BaseFunction() {
    };

    BaseFunction.extend({
        getProperties: function getProperties(self) {
            return self.constructor.prototype;
        }
    });

    Base.prototype.lib.function = new BaseFunction();

});