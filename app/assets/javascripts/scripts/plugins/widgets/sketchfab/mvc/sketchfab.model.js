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
], function defineSketchfabModel(BaseModel, WidgetContentModel) {

    /**
     * Define Sketchfab model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SketchfabModel
     * @constructor
     */
    var SketchfabModel = function SketchfabModel() {

        /**
         * Define preferences
         * @property SketchfabModel
         * @type {{sketchfabEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            sketchfabEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe width="640" height="480" src="https://sketchfab.com/models/20c8055de13d4b3c9e2a1b913971c1a1/embed" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe><p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;"> <a href="https://sketchfab.com/models/20c8055de13d4b3c9e2a1b913971c1a1?utm_medium=embed&utm_source=website&utm_campain=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Bio Hunter</a> by <a href="https://sketchfab.com/wixxi?utm_medium=embed&utm_source=website&utm_campain=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">FredericDegraeve</a> on <a href="https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campain=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a> </p>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property SketchfabModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SketchfabModel.extend('SketchfabModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
