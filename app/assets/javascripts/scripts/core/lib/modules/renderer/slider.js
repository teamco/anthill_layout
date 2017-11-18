/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/12/14
 * Time: 5:51 PM
 */

defineP(function defineSliderRenderer() {

  /**
   * Define Slider Renderer
   * @class SliderRenderer
   * @extends BaseElement
   * @constructor
   */
  var SliderRenderer = function SliderRenderer() {
  };

  return SliderRenderer.extend('SliderRenderer', {

    /**
     * Render slider
     * @memberOf SliderRenderer
     * @param $container
     * @param opts
     */
    renderSlider: function renderSlider($container, opts) {

      if (!$container) {
        this.view.scope.logger.warn('Undefined $container', opts);
        return false;
      }

      if (!$container.slider) {
        this.view.scope.logger.warn('Undefined slider');
        return false;
      }

      $container.slider(opts);

      var labels = opts.labels || [],
          i = opts.min || 0,
          l = labels.length;

      for (i; i < l; i += (opts.step || 1)) {

        // Calculate left position
        var left = ( i / opts.max * 100 ).toFixed(2) + "%";

        var $separator = $('<div class="ui-slider-tick separator" />').css({
          left: left
        });

        var $label = $('<div class="ui-slider-tick label" />').css({
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