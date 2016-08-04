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
], function defineTheWeatherNetworkModel(BaseModel, WidgetContentModel) {

    /**
     * Define TheWeatherNetwork model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TheWeatherNetworkModel
     * @constructor
     */
    var TheWeatherNetworkModel = function TheWeatherNetworkModel() {

        /**
         * Define preferences
         * @property TheWeatherNetworkModel
         * @type {{theweathernetworHtmlCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            theweathernetworHtmlCode: {
                type: 'text',
                disabled: false,
                value: "<div id=\"plemx-root\"></div><a href=\"http://www.theweathernetwork.com\">The Weather Network</a><script type=\"text/javascript\">var _plm = _plm || [];_plm.push(['_btn', 36360]);_plm.push(['_loc','usny0996']);_plm.push(['location', document.location.host ]);(function(d,e,i) {if (d.getElementById(i)) return;var px = d.createElement(e);px.type = 'text/javascript';px.async = true;px.id = i;px.src = ('https:' == d.location.protocol ? 'https:' : 'http:') + '//widget.twnmm.com/js/btn/pelm.js?orig=en_ca';var s = d.getElementsByTagName('script')[0];var py = d.createElement('link');py.rel = 'stylesheet';py.href = ('https:' == d.location.protocol ? 'https:' : 'http:') + '//widget.twnmm.com/styles/btn/styles.css's.parentNode.insertBefore(px, s);s.parentNode.insertBefore(py, s);})(document, 'script', 'plmxbtn');</script>",
                visible: true
            }
        };

        /**
         * Define rules
         * @property TheWeatherNetworkModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TheWeatherNetworkModel.extend('TheWeatherNetworkModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
