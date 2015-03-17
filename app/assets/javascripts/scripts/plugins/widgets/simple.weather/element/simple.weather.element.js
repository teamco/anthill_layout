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
         * @param {{latitude: number, longitude: number, unit: string}} opts
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

        loadWeather: function loadWeather(location, woeid, unit) {

            var $element = this;

            $.simpleWeather({
                location: location,
                woeid: woeid,
                unit: (unit || 'C').toLowerCase(),
                success: function (weather) {

                    $element.$.append([
                        '<h2><i class="icon-', weather.code, '"></i> ', weather.temp, '&deg;', weather.units.temp, '</h2>',
                        '<ul><li>', weather.city, ', ', weather.region, '</li>',
                        '<li class="currently">', weather.currently, '</li>',
                        '<li>', weather.alt.temp, '&deg;C</li></ul>'
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
