/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function definePizapPhotoEditorModel(BaseModel, WidgetContentModel) {

    /**
     * Define PizapPhotoEditor model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PizapPhotoEditorModel
     * @constructor
     */
    var PizapPhotoEditorModel = function PizapPhotoEditorModel() {

        /**
         * Define preferences
         * @property PizapPhotoEditorModel
         * @type {{pizapphotoeditorHtmlCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            pizapphotoeditorHtmlCode: {
                type: 'textarea',
                disabled: false,
                value: "<a href='http://www.pizap.com/image/10156318740700594pizapw1470374573.jpg' target='_blank'><img src='http://s3-us-west-1.amazonaws.com/imagesw.pizap.com/10156318740700594pizapw1470374573.jpg' border='0' width='800'/><br></a><a style='font-size:12px' href='http://www.pizap.com/u/10156318740700594' target='_blank'>10156318740700594</a> <span style='font-size:12px'> on </span><a style='font-size:12px' href='http://www.pizap.com' target='_blank'>piZap.com</a>",
                visible: true
            }
        };

        /**
         * Define rules
         * @property PizapPhotoEditorModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PizapPhotoEditorModel.extend('PizapPhotoEditorModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
