/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

define(['modules/base'], function defineBaseTimeDate(Base) {
    var BaseTimeDate = function BaseTimeDate() {
    };

    BaseTimeDate.extend({
        timestamp: function timestamp() {
            return new Date().getTime();
        }
    });

    Base.prototype.lib.timedate = new BaseTimeDate();

});