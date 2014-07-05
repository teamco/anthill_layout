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
        setStickToCenterLeft: function setStickToCenterLeft() {
            this.logger.debug('setStickToCenterLeft');

            this.view.get$item().stickToCenterLeft(
                this.controller.getContainment()
            );
        },

        /**
         * Stick to center top
         * @member WidgetStick
         */
        setStickToCenterTop: function setStickToCenterTop() {
            this.logger.debug('setStickToCenterTop');

            this.view.get$item().stickToCenterTop(
                this.controller.getContainment()
            );
        },

        /**
         * Stick to center
         * @member WidgetStick
         */
        setStickToCenter: function setStickToCenter() {
            this.logger.debug('setStickToCenter');

            this.view.get$item().stickToCenter(
                this.controller.getContainment()
            );
        },

        /**
         * Stick to center bottom
         * @member WidgetStick
         */
        setStickToCenterBottom: function setStickToCenterBottom() {
            this.logger.debug('setStickToCenterBottom');

            this.view.get$item().stickToCenterBottom(
                this.controller.getContainment()
            );
        },

        /**
         * Stick to center left
         * @member WidgetStick
         */
        setStickToCenterRight: function setStickToCenterRight() {
            this.logger.debug('setStickToCenterRight');

            this.view.get$item().stickToCenterRight(
                this.controller.getContainment()
            );
        },

        /**
         * Stick to top left
         * @member WidgetStick
         */
        setStickToTopLeft: function setStickToTopLeft() {
            this.logger.debug('setStickToTopLeft');

            this.view.get$item().stickToTopLeft(
                this.controller.getContainment()
            );
        },

        /**
         * Stick to bottom left
         * @member WidgetStick
         */
        setStickToBottomLeft: function setStickToBottomLeft() {
            this.logger.debug('setStickToBottomLeft');

            this.view.get$item().stickToBottomLeft(
                this.controller.getContainment()
            );
        },

        /**
         * Stick to top right
         * @member WidgetStick
         */
        setStickToTopRight: function setStickToTopRight() {
            this.logger.debug('setStickToTopRight');

            this.view.get$item().stickToTopRight(
                this.controller.getContainment()
            );
        },

        /**
         * Stick to bottom right
         * @member WidgetStick
         */
        setStickToBottomRight: function setStickToBottomRight() {
            this.logger.debug('setStickToBottomRight');

            this.view.get$item().stickToBottomRight(
                this.controller.getContainment()
            );
        },

        /**
         * Restore widget sticker
         * @member WidgetStick
         */
        restoreWidgetSticker: function restoreWidgetSticker() {
            this.logger.debug('setStickToBottomRight');

            this.view.get$item().restoreSticker(
                this.controller.getContainment()
            );
        }
    });
});