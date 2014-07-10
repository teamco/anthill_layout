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
    'modules/renderer/label',
    'modules/renderer/text.area',
    'modules/renderer/text.field',
    'modules/renderer/tool.tip'
], function defineRenderer(AntHill, CheckBox, ComboBox, EventLink, Label, TextArea, TextField, ToolTip) {

    /**
     * Define renderer
     * @class Renderer
     * @extends AntHill
     * @extends BaseElement
     * @extends {CheckBoxRenderer} CheckBox
     * @extends {ComboBoxRenderer} ComboBox
     * @extends {EventLinkRenderer} EventLink
     * @extends {LabelRenderer} Label
     * @extends {TextAreaRenderer} TextArea
     * @extends {TextFieldRenderer} TextField
     * @extends {ToolTipRenderer} ToolTip
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
        Label.prototype,
        TextArea.prototype,
        TextField.prototype,
        ToolTip.prototype
    );
});