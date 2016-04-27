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
], function defineAnimatronModel(BaseModel, WidgetContentModel) {

    /**
     * Define Animatron model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class AnimatronModel
     * @constructor
     */
    var AnimatronModel = function AnimatronModel() {

        /**
         * Define preferences
         * @property AnimatronModel
         * @type {{animatronEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            animatronEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="https://publish.animatron.io/65b1205751543105d447f184?w=640&h=360&a=1&r=0&c=0" width="640" height="360" frameborder="0"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property AnimatronModel
         * @type {{}}
         */
        this.rules = {};
    };

    return AnimatronModel.extend(
        'AnimatronModel', {},
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});
