/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineOpenWeatherMapElement(BaseElement) {

    /**
     * Define OpenWeatherMap Element
     * @param view
     * @param opts
     * @returns {OpenWeatherMapElement}
     * @constructor
     * @class OpenWeatherMapElement
     * @extends BaseElement
     */
    var OpenWeatherMapElement = function OpenWeatherMapElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('open.weather.map', {resource: '/widgets'});

        return this;
    };

    return OpenWeatherMapElement.extend('OpenWeatherMapElement', {

        /**
         * Render Embedded content
         * @member OpenWeatherMapElement
         * @param {{
         *      latitude: number,
         *      longitude: number,
         *      zoom: number,
         *      width: number,
         *      height: number,
         *      maptype: string,
         *      sensor: boolean,
         *      scale: boolean,
         *      sensor: boolean,
         *      stretch: boolean
         * }} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            var url = [
                'http://maps.googleapis.com/maps/api/staticmap',
                '?center=', opts.latitude, ',', opts.longitude,
                '&markers=color:blue|label:S|', opts.latitude, ',', opts.longitude,
                '&maptype=', opts.maptype.toLowerCase(),
                '&zoom=', opts.zoom,
                '&scale=', (opts.scale ? 2 : 1),
                '&size=', opts.width, 'x', opts.height,
                '&sensor=', opts.sensor
            ].join('');

            this.$.append(
                $('<img />').attr({
                    src: url,
                    alt: url
                }).addClass(opts.stretch ? 'stretch' : undefined)
            );

            this.view.controller.clearParentThumbnail();
        }

    }, BaseElement.prototype);

});