/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/12/14
 * Time: 5:51 PM
 */

define([], function defineSliderRenderer() {

    /**
     * Define Slider Renderer
     * @class SliderRenderer
     * @constructor
     */
    var SliderRenderer = function SliderRenderer() {

    };

    return SliderRenderer.extend('SliderRenderer', {

        /**
         * Render slider
         * @member SliderRenderer
         * @param $container
         * @param opts
         */
        renderSlider: function renderSlider($container, opts) {

            if (!$container) {

                this.view.scope.logger.warn('Undefined $container', opts);
                return false;
            }

            $container.slider(opts);

            var labels = opts.labels || [],
                i = opts.min || 0,
                l = labels.length;

            for (i; i < l; i += (opts.step || 1)) {

                // Calculate left position
                var left = ( i / opts.max * 100 ).toFixed(2) + "%";

                var $separator = $("<div/>").addClass("ui-slider-tick separator").css({
                    left: left
                });

                var $label = $("<div/>").addClass("ui-slider-tick label").css({
                    left: left
                }).text(labels[i]);

                $container.append($separator, $label);

                $label.css({
                    marginLeft: -(this.textMetrics($label).width / 2)
                });
            }
        }
    });
});