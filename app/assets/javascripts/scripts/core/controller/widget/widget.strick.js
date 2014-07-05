/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/5/14
 * Time: 11:36 AM
 */

define([], function defineWidgetStick() {

    var WidgetStick = function WidgetStick() {

    };

    return WidgetStick.extend('WidgetStick', {

        /**
         * Stick to center left
         * @member WidgetStick
         */
        stickToCenterLeft: function stickToCenterLeft() {

            this.logger.debug('stickToCenterLeft');
        },

        /**
         * Stick to center top
         * @member WidgetStick
         */
        stickToCenterTop: function stickToCenterTop() {

            this.logger.debug('stickToCenterTop');
        },

        /**
         * Stick to center
         * @member WidgetStick
         */
        stickToCenter: function stickToCenter() {
            this.logger.debug('stickToCenter');
        },

        /**
         * Stick to center bottom
         * @member WidgetStick
         */
        stickToCenterBottom: function stickToCenterBottom() {
            this.logger.debug('stickToCenterBottom');
        },

        /**
         * Stick to center left
         * @member WidgetStick
         */
        stickToCenterRight: function stickToCenterRight() {
            this.logger.debug('stickToCenterRight');
        },

        /**
         * Stick to top left
         * @member WidgetStick
         */
        stickToTopLeft: function stickToTopLeft() {
            this.logger.debug('stickToTopLeft');
        },

        /**
         * Stick to bottom left
         * @member WidgetStick
         */
        stickToBottomLeft: function stickToBottomLeft() {
            this.logger.debug('stickToBottomLeft');
        },

        /**
         * Stick to top right
         * @member WidgetStick
         */
        stickToTopRight: function stickToTopRight() {
            this.logger.debug('stickToTopRight');
        },

        /**
         * Stick to bottom right
         * @member WidgetStick
         */
        stickToBottomRight: function stickToBottomRight() {
            this.logger.debug('stickToBottomRight');
        }
    });
});