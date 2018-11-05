/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

defineP([
  'modules/Element'
], function defineCoverElement(BaseElement) {

  /**
   * Define Cover Element
   * @param view
   * @param opts
   * @returns {CoverElement}
   * @constructor
   * @class CoverElement
   * @extends BaseElement
   */
  var CoverElement = function CoverElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    }).$.css({
      opacity: opts.opacity || 0.6
    }).addClass('cover');

    return this;
  };

  return CoverElement.extend('CoverElement', {}, BaseElement.prototype);
});