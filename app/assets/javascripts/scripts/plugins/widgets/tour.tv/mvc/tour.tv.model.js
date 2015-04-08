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
], function defineTourTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define TourTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TourTvModel
     * @constructor
     */
    var TourTvModel = function TourTvModel() {

        /**
         * Define preferences
         * @memberOf TourTvModel
         * @type {{
         *      tourtvEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            tourtvEmbedCode: {
                type: 'textarea',
                disabled: true,
                value: '<object type="application/x-shockwave-flash" id="myDynamicContent" name="myDynamicContent" data="http://www.planeta-online.tv/planeta_player.swf?ver=102" width="692" height="384"><param name="menu" value="true"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="wmode" value="opaque"><param name="flashvars" value="f=ZHVyYXRpb249LTEmbG9nbz1odHRwOi8vd3d3LnBsYW5ldGEtb25saW5lLnR2L2ltYWdlcy9sb2dvL3R2dC5wbmcmYWRmb3g9dHJ1ZSZjYXRfaWQ9MTAmc3ViamVjdD04JnB1aWQ2PTEwNyZhZ2U9MyZ5ZWFyPTkmZ2VvPTEmY29kZT0wMDQxYTI2Zjk3OGE0MzkzYTQzY2M0OWRhNWNmYmQ2NCZkbD13d3cucGxhbmV0YS1vbmxpbmUudHYmcmVmPXd3dy5nb29nbGUuY29tJmxpbms9aHR0cDovL3d3dy5wbGFuZXRhLW9ubGluZS50di9jaGFubmVscy8yLmh0bWwmb3BlbkxpbmtzPV9zZWxmJnRpdGxlPSVEMCVBMiVEMCU5MiVEMCVBMiVEMCVBMyVEMCVBMC5UViZydG1wPXJ0bXA6Ly84MC45My41My44ODoxOTM1L2xpdmUvY2hhbm5lbF8y"></object>',
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf TourTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TourTvModel.extend('TourTvModel', {

        /**
         * Set TourTv embed code
         * @memberOf TourTvModel
         * @param {string} embed
         */
        setTourtvEmbedCode: function setTourtvEmbedCode(embed) {
            this.setPrefs('tourtvEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
