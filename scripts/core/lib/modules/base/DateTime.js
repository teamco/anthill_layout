/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function defineBaseDateTime() {

    /**
     * Define Date time
     * @class BaseDateTime
     * @constructor
     */
    var BaseDateTime = function BaseDateTime() {
    };

    BaseDateTime.extend('BaseDateTime', {

        /**
         * Get date
         * @member BaseDateTime
         * @returns {Date}
         */
        getDate: function getDate() {
            return new Date();
        },

        /**
         * Get timestamp
         * @member BaseDateTime
         * @param time
         * @returns {*}
         */
        timestamp: function timestamp(time) {
            return time ? time :
                this.getDate().getTime();
        },

        /**
         * Get timestamp utc
         * @member BaseDateTime
         * @returns {number}
         */
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