/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/3/14
 * Time: 12:14 AM
 */
define([
  'config/anthill',
  'modules/renderer/check.box',
  'modules/renderer/combo.box',
  'modules/renderer/event.link',
  'modules/renderer/iframe',
  'modules/renderer/embed',
  'modules/renderer/object',
  'modules/renderer/filter',
  'modules/renderer/comments',
  'modules/renderer/label',
  'modules/renderer/tabs',
  'modules/renderer/fieldset',
  'modules/renderer/slider',
  'modules/renderer/text.editor',
  'modules/renderer/text.area',
  'modules/renderer/text.field',
  'modules/renderer/number.field',
  'modules/renderer/tool.tip',
  'modules/renderer/upload.on.drop',
  'modules/renderer/text.download',
  'modules/renderer/validation',
  'modules/renderer/range',
  'modules/renderer/source',
  'modules/renderer/list.box'
], function defineRenderer(AntHill, CheckBox, ComboBox, EventLink, Iframe,
    Embed, ObjectEmbed, Filter, Comments, Label, Tabs, FieldSet, Slider,
    TextEditor, TextArea, TextField, NumberField, ToolTip, UploadOnDrop,
    TextDownload, Validation, Range, Source, ListBox) {

  /**
   * Define renderer
   * @class Renderer
   * @extends AntHill
   * @extends BaseElement
   * @extends {CheckBoxRenderer} CheckBox
   * @extends {ComboBoxRenderer} ComboBox
   * @extends {EventLinkRenderer} EventLink
   * @extends {IframeRenderer} Iframe
   * @extends {EmbedRenderer} Embed
   * @extends {ObjectRenderer} ObjectEmbed
   * @extends {FilterRenderer} Filter
   * @extends {CommentsRenderer} Comments
   * @extends {LabelRenderer} Label
   * @extends {FieldSetRenderer} FieldSet
   * @extends {TabsRenderer} Tabs
   * @extends {SliderRenderer} Slider
   * @extends {TextEditorRenderer} TextEditor
   * @extends {TextAreaRenderer} TextArea
   * @extends {TextFieldRenderer} TextField
   * @extends {NumberFieldRenderer} NumberField
   * @extends {ToolTipRenderer} ToolTip
   * @extends {UploadOnDropRenderer} UploadOnDrop
   * @extends {TextDownloadRenderer} TextDownload
   * @extends {ValidationRenderer} Validation
   * @extends {RangeRenderer} Range
   * @extends {SourceRenderer} Source
   * @extends {ListBoxRenderer} ListBox
   * @constructor
   */
  var Renderer = function Renderer() {
  };

  return Renderer.extend(
      'Renderer', {

        /**
         * Focus on field
         * @memberOf Renderer
         * @param {string} [element]
         */
        focusOn: function focusOn(element) {

          if (element) {
            $(element, this.$).focus();
          }
        },

        /**
         * Define monitor init
         * @memberOf Renderer
         * @param $input
         * @param monitor
         */
        initMonitor: function initMonitor($input, monitor) {

          /**
           * Get validated callback
           * @param {function} fn
           * @param {BaseController} controller
           * @returns {function|undefined}
           * @private
           */
          function _validateCallback(fn, controller) {

            if (typeof fn === 'function') {
              return fn;
            }

            controller.scope.logger.warn(
                'Undefined callback', fn, controller
            );
          }

          if (monitor && monitor.events) {

            /**
             * Get callback
             * @type {function|string}
             */
            var callback = monitor.callback;

            /**
             * Get controller
             * @type {BaseController}
             */
            var controller = this.view.controller;

            if (typeof callback === 'string' &&
                _validateCallback(controller[callback], controller)) {
              callback = controller[callback].bind(controller);
            }

            if (_validateCallback(callback, controller)) {
              $input.on(monitor.events.join(' '), callback);
            }
          }
        },

        /**
         * Define check visibility
         * @memberOf Renderer
         * @param $input
         * @param {boolean} visible
         */
        checkVisibility: function checkVisibility($input, visible) {
          if (!visible) $input.hide();
        },

        /**
         * Toggle disable
         * @memberOf Renderer
         * @param $input
         * @param {boolean} disabled
         */
        toggleDisableField: function toggleDisableField($input, disabled) {
          $input.attr({disabled: disabled});
        }
      },
      AntHill.prototype,
      CheckBox.prototype,
      ComboBox.prototype,
      EventLink.prototype,
      Iframe.prototype,
      Embed.prototype,
      ObjectEmbed.prototype,
      Filter.prototype,
      Comments.prototype,
      Label.prototype,
      Tabs.prototype,
      FieldSet.prototype,
      Slider.prototype,
      TextEditor.prototype,
      TextArea.prototype,
      TextField.prototype,
      NumberField.prototype,
      TextDownload.prototype,
      UploadOnDrop.prototype,
      ToolTip.prototype,
      Validation.prototype,
      Range.prototype,
      Source.prototype,
      ListBox.prototype
  );
});