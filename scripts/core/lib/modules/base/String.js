/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(['modules/base'], function defineBaseString(Base) {
    var BaseString = function BaseString() {
    };

    BaseString.extend({
    }, Base);

    Base.prototype.lib.string = new BaseString();

});
