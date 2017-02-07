/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineGeolocationMapElement(PluginElement) {

  /**
   * Define GeolocationMap Element
   * @param view
   * @param opts
   * @returns {GeolocationMapElement}
   * @constructor
   * @class GeolocationMapElement
   * @extends PluginElement
   */
  let GeolocationMapElement = function GeolocationMapElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('geolocation.map', {resource: '/widgets'});

    return this;
  };

  return GeolocationMapElement.extend('GeolocationMapElement', {

    /**
     * Render Embedded content
     * @memberOf GeolocationMapElement
     * @param {{
         *      latitude: number,
         *      longitude: number,
         *      zoom: number,
         *      width: number,
         *      height: number,
         *      apiKey: string,
         *      maptype: string,
         *      sensor: boolean,
         *      scale: boolean,
         *      sensor: boolean,
         *      stretch: boolean
         * }} opts
     */
    renderEmbeddedContent: function renderEmbeddedContent(opts) {

      let url = [
        'https://maps.googleapis.com/maps/api/staticmap',
        '?center=', opts.latitude, ',', opts.longitude,
        '&markers=color:blue|label:S|', opts.latitude, ',', opts.longitude,
        '&maptype=', opts.maptype.toLowerCase(),
        '&zoom=', opts.zoom,
        '&scale=', (opts.scale ? 2 : 1),
        '&size=', opts.width, 'x', opts.height,
        '&sensor=', opts.sensor,
        '&key=', opts.apiKey
      ].join('');

      this.$.append(
          $('<img />').attr({
            src: url,
            alt: url
          }).addClass(opts.stretch ? 'stretch' : undefined)
      );

      this.view.controller.clearParentThumbnail();
    }

  }, PluginElement.prototype);

});