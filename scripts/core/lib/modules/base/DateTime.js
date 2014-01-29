/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function defineBaseDateTime() {

    var BaseDateTime = function BaseDateTime() {
    };

    BaseDateTime.extend({
        getDate: function getDate() {
            return new Date();
        },
        timestamp: function timestamp(time) {
            return time ? time :
                this.getDate().getTime();
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

    return new BaseDateTime();

});