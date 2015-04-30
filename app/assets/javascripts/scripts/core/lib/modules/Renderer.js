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
    'modules/renderer/fieldset',
    'modules/renderer/slider',
    'modules/renderer/text.editor',
    'modules/renderer/text.area',
    'modules/renderer/text.field',
    'modules/renderer/number.field',
    'modules/renderer/tool.tip',
    'modules/renderer/upload.on.drop',
    'modules/renderer/text.download',
    'modules/renderer/validation'
], function defineRenderer(AntHill, CheckBox, ComboBox, EventLink, Iframe, Embed, ObjectEmbed, Filter, Comments, Label, FieldSet, Slider, TextEditor, TextArea, TextField, NumberField, ToolTip, UploadOnDrop, TextDownload, Validation) {

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
     * @extends {FieldSetRenderer} Label
     * @extends {SliderRenderer} Slider
     * @extends {TextEditorRenderer} TextEditor
     * @extends {TextAreaRenderer} TextArea
     * @extends {TextFieldRenderer} TextField
     * @extends {NumberFieldRenderer} NumberField
     * @extends {ToolTipRenderer} ToolTip
     * @extends {UploadOnDropRenderer} UploadOnDrop
     * @extends {TextDownloadRenderer} TextDownload
     * @extends {ValidationRenderer} Validation
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

                if (monitor) {

                    $input.on(
                        monitor.events.join(' '),
                        monitor.callback
                    );
                }
            },

            /**
             * Define check visibility
             * @memberOf Renderer
             * @param $input
             * @param {boolean} visible
             */
            checkVisibility: function checkVisibility($input, visible) {

                if (!visible) {
                    $input.hide();
                }
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
        FieldSet.prototype,
        Slider.prototype,
        TextEditor.prototype,
        TextArea.prototype,
        TextField.prototype,
        NumberField.prototype,
        TextDownload.prototype,
        UploadOnDrop.prototype,
        ToolTip.prototype,
        Validation.prototype
    );
});