/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSimpleWeatherElement(BaseElement) {

    /**
     * Define SimpleWeather Element
     * @param view
     * @param opts
     * @returns {SimpleWeatherElement}
     * @constructor
     * @class SimpleWeatherElement
     * @extends BaseElement
     */
    var SimpleWeatherElement = function SimpleWeatherElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('simple.weather', {resource: '/widgets'});

        return this;
    };

    return SimpleWeatherElement.extend('SimpleWeatherElement', {

        /**
         * Render Embedded content
         * @member SimpleWeatherElement
         * @param {{
         *      latitude: number,
         *      longitude: number,
         *      unit: string
         * }} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            // Docs at http://simpleweatherjs.com
            require([
                    'plugins/widgets/simple.weather/lib/jquery.simpleWeather.min'
                ],
                function loadSimpleWeather() {

                    this.loadWeather(
                        opts.latitude + ',' + opts.longitude,
                        undefined,
                        opts.unit
                    );

                }.bind(this)
            );
        },

        /**
         * Define loader
         * @member SimpleWeatherElement
         * @param {string} location
         * // Where On Earth Identifier
         * @param woeid
         * @param {string} unit
         */
        loadWeather: function loadWeather(location, woeid, unit) {

            /**
             * Get $element
             * @type {SimpleWeatherElement}
             */
            var $element = this;

            unit = (unit || 'C').charAt(0);

            $.simpleWeather({
                location: location,
                woeid: woeid,
                unit: unit.toLowerCase(),
                success: function (weather) {

                    $element.$.append([
                        '<h2><i class="icon-', weather.code, '"></i> ',
                        weather.temp, '&deg;', weather.units.temp, '</h2>',
                        '<ul><li>', weather.city, ', ', weather.region, '</li>',
                        '<li class="currently">', weather.currently, '</li>',
                        '<li>', weather.alt.temp, '&deg;', weather.alt.unit, '</li></ul>'
                    ].join(''));
                },
                error: function error(error) {

                    $element.view.scope.logger.warn(
                        'Unable to load widget', error
                    );
                }
            });
        }
    }, BaseElement.prototype);
});
