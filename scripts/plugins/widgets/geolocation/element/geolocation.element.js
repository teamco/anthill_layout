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
         * @param {*} position
         */
        renderEmbeddedContent: function renderEmbeddedContent(position, sensor) {

            var url = [
                'http://maps.googleapis.com/maps/api/staticmap?center=',
                [position.coords.latitude, position.coords.longitude],
                '&zoom=14&sensor=', sensor
            ].join('');

            this.$.append(
                $('<img />').attr({
                    src: url
                })
            );
        }

    }, BaseElement.prototype);

});