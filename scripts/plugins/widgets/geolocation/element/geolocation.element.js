/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineGeolocationElement(BaseElement) {

    /**
     * Define Geolocation Element
     * @param view
     * @param opts
     * @returns {GeolocationElement}
     * @constructor
     * @class GeolocationElement
     * @extends BaseElement
     */
    var GeolocationElement = function GeolocationElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('geolocation', {resource: '/widgets'});

        return this;
    };

    return GeolocationElement.extend('GeolocationElement', {

        /**
         * Render Embedded content
         * @member GeolocationElement
         * @param {{latitude, longitude}} position
         * @param {{zoom, width, height, sensor}} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(position, opts) {

            var url = [
                'http://maps.googleapis.com/maps/api/staticmap?center=',
                position.latitude, ',', position.longitude,
                '&zoom=', opts.zoom, '&size=', opts.width, 'x', opts.height,
                'sensor=', opts.sensor
            ].join('');

            this.$.append(
                $('<img />').attr({
                    src: url
                }).addClass(opts.stretch ? 'stretch' : null)
            );
        }

    }, BaseElement.prototype);

});