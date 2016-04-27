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
], function definePasteryModel(BaseModel, WidgetContentModel) {

    /**
     * Define Pastery model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PasteryModel
     * @constructor
     */
    var PasteryModel = function PasteryModel() {

        /**
         * Define preferences
         * @property PasteryModel
         * @type {{pasteryEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            pasteryEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<script>(function(d, s, id) {var js, pastejs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src =\'https://www.pastery.net/static/js/embed.js\';pastejs.parentNode.insertBefore(js, pastejs);}(document, \'script\', \'pastery-jssdk\'));</script><div class=\'paste-list\' data-pasteid=\'pkeade\'></div>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property PasteryModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PasteryModel.extend('PasteryModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
