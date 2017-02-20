/**
 * Created by teamco on 26/03/2016.
 */
define(function defineSiteConfigWidthPreferences() {

  /**
   * Define SiteConfig Width Preferences
   * @class SiteConfigWidthPreferences
   * @extends Renderer
   * @constructor
   */
  var SiteConfigWidthPreferences = function SiteConfigWidthPreferences() {
  };

  return SiteConfigWidthPreferences.extend('SiteConfigWidthPreferences', {

    /**
     * Render static width
     * @memberOf SiteConfigWidthPreferences
     * @returns {*|jQuery}
     */
    siteStaticWidth: function siteStaticWidth() {

      /**
       * Define index
       * @type {string}
       */
      var text = 'staticWidth';

      /**
       * Get workspace
       * @type {Workspace}
       */
      var workspace = this.view.controller.getWorkspace(),
          preferences = workspace.model.getConfig('preferences'),
          checked = preferences[text];

      /**
       * Define checkbox
       * @type {CheckBoxRenderer}
       */
      var $element = this.renderCheckbox({
        name: text,
        text: text.humanize(),
        checked: checked,
        value: checked,
        disabled: false,
        visible: true,
        monitor: {
          events: ['click.width'],
          callback: this.toggleSlider.bind(this)
        }
      });

      return $('<li />').addClass([
        ['workspace', text.humanize().toClassName(), 'prefs'].join('-'),
        'checkbox'
      ].join(' ')).append($element);
    },

    /**
     * Enable/Disable slider
     * @memberOf SiteConfigWidthPreferences
     * @param {Event} e
     */
    toggleSlider: function toggleSlider(e) {

      /**
       * Get workspace
       * @type {Workspace}
       */
      var workspace = this.view.controller.getWorkspace();

      /**
       * Get $workspace
       * @type {WorkspaceElement}
       */
      var $workspace = workspace.view.get$item();

      var $input = $(e.target),
          $slider = $('.ui-slider', $input.parents('ul')),
          checked = $input.prop('checked');

      if (checked) {

        var width = $slider.slider('value') || 0;

        $workspace.updateWidth(width);
        $('input[name="siteWidthSlider"]', $slider.parent()).val(width);
        $slider.slider('enable');

      } else {

        $workspace.unsetWidth();
        $slider.slider('disable');
      }
    },

    /**
     * Render width slider
     * @memberOf SiteConfigWidthPreferences
     * @param {Array} map
     * @returns {*|jQuery}
     */
    siteWidthSlider: function siteWidthSlider(map) {

      /**
       * Get scope
       * @type {SiteConfig}
       */
      var scope = this.view.scope;

      /**
       * Get workspace
       * @type {Workspace}
       */
      var workspace = scope.controller.getWorkspace();

      /**
       * Get w$workspace
       * @type {WorkspaceElement}
       */
      var $workspace = workspace.view.get$item();

      /**
       * Get site preferences
       * @type {{siteWidthSlider, staticWidth}}
       */
      var preferences = workspace.model.getConfig('preferences');

      var uuid = scope.base.lib.generator.UUID() + '-slider',
          $ul = $('<ul class="default site-width-slider" />'),
          $slider = $('<div />');

      /**
       * Get site slider value
       * @type {number}
       */
      var sliderValue = preferences.siteWidthSlider;

      /**
       * Render slider input
       * @type {TextFieldRenderer|jQuery}
       */
      var $textfield = this.renderTextField({
        name: 'siteWidthSlider',
        disabled: false,
        visible: false,
        value: sliderValue
      });

      /**
       * Define on slide
       * @param event
       * @param ui
       * @private
       */
      function _slide(event, ui) {
        $textfield.find('input').val(ui.value);
        $workspace.updateWidth(ui.value);
        scope.logger.debug('On slide', event, ui);
      }

      this.renderSlider($slider, {
        value: sliderValue || 1,
        min: 0,
        max: map.length - 1,
        labels: map,
        disabled: !preferences.staticWidth,
        slide: _slide.bind(this)
      });

      $ul.append(
          this.siteStaticWidth(),
          $('<li class="workspace-site-width-prefs slider" />').append(
              this.renderLabel(uuid, 'Site Width', 'slider', true),
              $slider,
              $textfield
          )
      );

      return $ul;
    }
  });
});