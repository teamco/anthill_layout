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
], function defineRenderer(AntHill, CheckBox, ComboBox, EventLink, Iframe, Embed, ObjectEmbed, Filter, Label, FieldSet, Slider, TextEditor, TextArea, TextField, NumberField, ToolTip, UploadOnDrop, TextDownload, Validation) {

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
             * @member Renderer
             * @param {string} [element]
             */
            focusOn: function focusOn(element) {

                if (element) {
                    $(element, this.$).focus();
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