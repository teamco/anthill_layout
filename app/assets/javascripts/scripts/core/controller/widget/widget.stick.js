/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/5/14
 * Time: 11:36 AM
 */

defineP(function defineWidgetStick() {

  /**
   * Define widget stick
   * @class WidgetStick
   * @constructor
   */
  var WidgetStick = function WidgetStick() {
  };

  return WidgetStick.extend('WidgetStick', {

    /**
     * Unset stick
     * @memberOf WidgetStick
     */
    unsetStick: function unsetStick() {
      this.logger.debug('unsetStick');
      this.view.get$item().restoreSticker(true);
    },

    /**
     * Stick to center left
     * @memberOf WidgetStick
     */
    setStickToCenterLeft: function setStickToCenterLeft() {
      this.logger.debug('setStickToCenterLeft');

      this.view.get$item().stickToCenterLeft(
          this.controller.getContainment()
      );
    },

    /**
     * Stick to center top
     * @memberOf WidgetStick
     */
    setStickToCenterTop: function setStickToCenterTop() {
      this.logger.debug('setStickToCenterTop');

      this.view.get$item().stickToCenterTop(
          this.controller.getContainment()
      );
    },

    /**
     * Stick to center
     * @memberOf WidgetStick
     */
    setStickToCenter: function setStickToCenter() {
      this.logger.debug('setStickToCenter');

      this.view.get$item().stickToCenter(
          this.controller.getContainment()
      );
    },

    /**
     * Stick to center bottom
     * @memberOf WidgetStick
     */
    setStickToCenterBottom: function setStickToCenterBottom() {
      this.logger.debug('setStickToCenterBottom');

      this.view.get$item().stickToCenterBottom(
          this.controller.getContainment()
      );
    },

    /**
     * Stick to center left
     * @memberOf WidgetStick
     */
    setStickToCenterRight: function setStickToCenterRight() {
      this.logger.debug('setStickToCenterRight');

      this.view.get$item().stickToCenterRight(
          this.controller.getContainment()
      );
    },

    /**
     * Stick to top left
     * @memberOf WidgetStick
     */
    setStickToTopLeft: function setStickToTopLeft() {
      this.logger.debug('setStickToTopLeft');

      this.view.get$item().stickToTopLeft(
          this.controller.getContainment()
      );
    },

    /**
     * Stick to bottom left
     * @memberOf WidgetStick
     */
    setStickToBottomLeft: function setStickToBottomLeft() {
      this.logger.debug('setStickToBottomLeft');

      this.view.get$item().stickToBottomLeft(
          this.controller.getContainment()
      );
    },

    /**
     * Stick to top right
     * @memberOf WidgetStick
     */
    setStickToTopRight: function setStickToTopRight() {
      this.logger.debug('setStickToTopRight');

      this.view.get$item().stickToTopRight(
          this.controller.getContainment()
      );
    },

    /**
     * Stick to bottom right
     * @memberOf WidgetStick
     */
    setStickToBottomRight: function setStickToBottomRight() {
      this.logger.debug('setStickToBottomRight');

      this.view.get$item().stickToBottomRight(
          this.controller.getContainment()
      );
    },

    /**
     * Restore widget sticker
     * @memberOf WidgetStick
     */
    restoreWidgetSticker: function restoreWidgetSticker() {
      this.logger.debug('restoreWidgetSticker');

      this.view.get$item().restoreSticker();
    }
  });
});