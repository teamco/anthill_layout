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
], function defineSinoptikModel(BaseModel, WidgetContentModel) {

    /**
     * Define Sinoptik model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SinoptikModel
     * @constructor
     */
    var SinoptikModel = function SinoptikModel() {

        /**
         * Define preferences
         * @property SinoptikModel
         * @type {{sinoptikEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            sinoptikEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<div id="SinoptikInformer" style="width:240px;" class="SinoptikInformer type1c1"><div class="siHeader"><div class="siLh"><div class="siMh"><a onmousedown="siClickCount();" class="siLogo" href="https://sinoptik.ua/" target="_blank" title="Погода"> </a>Погода <span id="siHeader"></span></div></div></div><div class="siBody"><a onmousedown="siClickCount();" href="https://sinoptik.ua/погода-киев" title="Погода в Киеве" target="_blank"><div class="siCity"><div class="siCityName">Погода в <span>Киеве</span></div><div id="siCont0" class="siBodyContent"><div class="siLeft"><div class="siTerm"></div><div class="siT" id="siT0"></div><div id="weatherIco0"></div></div><div class="siInf"><p>влажность: <span id="vl0"></span></p><p>давление: <span id="dav0"></span></p><p>ветер: <span id="wind0"></span></p></div></div></div></a><div class="siLinks">Погода на <a href="https://sinoptik.ua/погода-донецк/" title="Погода в Донецке" target="_blank">sinoptik.ua</a>  в Донецке</div></div><div class="siFooter"><div class="siLf"><div class="siMf"></div></div></div></div><script type="text/javascript" charset="UTF-8" src="//sinoptik.ua/informers_js.php?title=4&amp;wind=3&amp;cities=303010783&amp;lang=ru"></script>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property SinoptikModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SinoptikModel.extend(
        'SinoptikModel', {},
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});
