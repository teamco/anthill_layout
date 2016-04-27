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
], function defineRepubhubModel(BaseModel, WidgetContentModel) {

    /**
     * Define Repubhub model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class RepubhubModel
     * @constructor
     */
    var RepubhubModel = function RepubhubModel() {

        /**
         * Define preferences
         * @property RepubhubModel
         * @type {{repubhubEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            repubhubEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<h1>Baseball: Results and links for Wed., April 27</h1><div class="repubhubembed"></div><p class="rhexcerpt">ESSENTIALS • Statewide schedule/scoreboard • What you need to know • Tuesday results/links • NJ.com Top 20, statewide rankings NEW! • Season stat leaders • Tuesday daily stat leaders • County/conference tournament brackets FEATURED COVERAGE Don Bosco Prep at No. 5 Bergen Catholic, 4pm • Game report • Live updates • Video • Boxscore Roxbury at&hellip;<!--more--></p><style>.rhexcerpt{display:none;}</style><iframe class="rhembed" src="//d2uzdrx7k4koxz.cloudfront.net/user/view.act?p=MTQ0NzI=&c=MzcxOTY4Mjc=&fuid=MjIzOTU2NTY=&showDate=true&showFirstImage=true" height="1500" width="100%" style="border:0;overflow-x:hidden;background:transparent;" allowtransparency="yes" scrolling="no" data-size="1845"></iframe><script async type="text/javascript" src="//d2uzdrx7k4koxz.cloudfront.net/user/js/rh.js"></script> <!-- TO HIDE THE DATE OR FIRST IMAGE, change "showDate=true" or "showFirstImage=true" to "false" -->',
                visible: true
            }
        };

        /**
         * Define rules
         * @property RepubhubModel
         * @type {{}}
         */
        this.rules = {};
    };

    return RepubhubModel.extend('RepubhubModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
