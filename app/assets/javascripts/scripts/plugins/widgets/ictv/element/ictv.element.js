/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineIctvElement(PluginElement) {

  /**
   * Define Ictv Element
   * @param view
   * @param opts
   * @returns {IctvElement}
   * @constructor
   * @class IctvElement
   * @extends PluginElement
   */
  var IctvElement = function IctvElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('ictv', {resource: '/widgets'});

    return this;
  };

  return IctvElement.extend('IctvElement', {

    /**
     * Render Embedded content
     * @memberOf IctvElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append([
        "<object id='zl_player' name='zl_player' type='application/x-shockwave-flash' data='http://fakty.ictv.ua/public/swfobject/zl_player.swf' width='100%' height='100%'>",
        "<param name='movie' value='http://fakty.ictv.ua/public/swfobject/zl_player.swf'/>",
        "<param name='bgcolor' value='#000000'/>",
        "<param name='quality' value='high'/>",
        "<param name='wmode' value='transparent'/>",
        "<param name='scale' value='exactfit'/>",
        "<param name='allowScriptAccess' value='always'/>",
        "<param name='allowFullScreen' value='true'/>",
        "<param name='flashvars' value='", url, "'/>",
        "</object>"
      ].join(''));
    }

  }, PluginElement.prototype);

});
