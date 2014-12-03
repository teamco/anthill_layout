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
    'modules/renderer/label',
    'modules/renderer/slider',
    'modules/renderer/text.area',
    'modules/renderer/text.field',
    'modules/renderer/tool.tip',
    'modules/renderer/upload.on.drop',
    'modules/renderer/text.download',
    'modules/renderer/validation'
], function defineRenderer(AntHill, CheckBox, ComboBox, EventLink, Iframe, Embed, ObjectEmbed, Label, Slider, TextArea, TextField, ToolTip, UploadOnDrop, TextDownload, Validation) {

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
     * @extends {LabelRenderer} Label
     * @extends {SliderRenderer} Slider
     * @extends {TextAreaRenderer} TextArea
     * @extends {TextFieldRenderer} TextField
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

        },
        AntHill.prototype,
        CheckBox.prototype,
        ComboBox.prototype,
        EventLink.prototype,
        Iframe.prototype,
        Embed.prototype,
        ObjectEmbed.prototype,
        Label.prototype,
        Slider.prototype,
        TextArea.prototype,
        TextField.prototype,
        TextDownload.prototype,
        UploadOnDrop.prototype,
        ToolTip.prototype,
        Validation.prototype
    );
});