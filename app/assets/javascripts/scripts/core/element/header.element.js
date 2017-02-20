/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Element'
], function defineHeaderElement(BaseElement) {

  /**
   * Define Header Element
   * @param view
   * @param opts
   * @returns {*}
   * @constructor
   * @class HeaderElement
   * @extends BaseElement
   */
  var HeaderElement = function HeaderElement(view, opts) {

    if (!view.getConfigHTML('header')) {
      return this;
    }

    return this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });
  };

  return HeaderElement.extend('HeaderElement', {}, BaseElement.prototype);
});