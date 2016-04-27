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
], function defineHuffdufferModel(BaseModel, WidgetContentModel) {

    /**
     * Define Huffduffer model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class HuffdufferModel
     * @constructor
     */
    var HuffdufferModel = function HuffdufferModel() {

        /**
         * Define preferences
         * @property HuffdufferModel
         * @type {{huffdufferEmbedCode: {type: string, value: string, disabled: boolean, visible: boolean}}}
         */
        this.preferences = {
            huffdufferEmbedCode: {
                type: 'textarea',
                value: '<object type="application/x-shockwave-flash" data="https://huffduffer.com/flash/player.swf?soundFile=http://traffic.libsyn.com/longform/Ep._189_-_Maciej_Ceglowski.mp3" width="290" height="24"><param name="movie" value="https://huffduffer.com/flash/player.swf?soundFile=http://traffic.libsyn.com/longform/Ep._189_-_Maciej_Ceglowski.mp3" /><param name="wmode" value="transparent" /><audio src="http://traffic.libsyn.com/longform/Ep._189_-_Maciej_Ceglowski.mp3" controls preload="none"><a href="https://huffduffer.com/sebastienmarion/324623">Longform Podcast #189: Maciej Ceglowski on Huffduffer</a></audio></object>',
                disabled: true,
                visible: true
            }
        };

        /**
         * Define rules
         * @property HuffdufferModel
         * @type {{}}
         */
        this.rules = {};
    };

    return HuffdufferModel.extend('HuffdufferModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
