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
], function defineKitchenbowlModel(BaseModel, WidgetContentModel) {

    /**
     * Define Kitchenbowl model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class KitchenbowlModel
     * @constructor
     */
    var KitchenbowlModel = function KitchenbowlModel() {

        /**
         * Define preferences
         * @property KitchenbowlModel
         * @type {{kitchenbowlEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            kitchenbowlEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<span class="kb-embed-wrapper" data-url="//www.kitchenbowl.com/embed/recipe/5hdez4y4cW/matcha-mint-affogato" data-format="wide" data-slug="matcha-mint-affogato" data-width="485px" data-height="575px"><a href="http://www.kitchenbowl.com/recipe/5hdez4y4cW/matcha-mint-affogato">Matcha Mint Affogato</a> by <a target="_blank" href="//www.kitchenbowl.com/profile/misshangrypants">misshangrypants</a> on <a href="//www.kitchenbowl.com">Kitchenbowl</a>.<script src="//www.kitchenbowl.com/js/load-embed.js"></script></span>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property KitchenbowlModel
         * @type {{}}
         */
        this.rules = {};
    };

    return KitchenbowlModel.extend('KitchenbowlModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
