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
        getDate: function getDate() {
            return new Date();
        },
        timestamp: function timestamp() {
            return this.getDate().getTime();
        },
        timestampUTC: function timestampUTC() {
            var now = this.getDate();
            return Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                now.getHours(),
                now.getMinutes(),
                now.getSeconds(),
                now.getMilliseconds()
            );
        }
    });

    Base.prototype.lib.timedate = new BaseTimeDate();

});