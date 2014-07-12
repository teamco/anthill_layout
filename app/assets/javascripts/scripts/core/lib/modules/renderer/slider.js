/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/12/14
 * Time: 5:51 PM
 */

define([], function defineSliderRenderer(){

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
        }
    });
});