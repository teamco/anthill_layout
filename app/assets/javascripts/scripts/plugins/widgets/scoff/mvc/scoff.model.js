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
], function defineScoffModel(BaseModel, WidgetContentModel) {

    /**
     * Define Scoff model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ScoffModel
     * @constructor
     */
    var ScoffModel = function ScoffModel() {

        /**
         * Define preferences
         * @property ScoffModel
         * @type {{scoffEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            scoffEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: [
                    '<script src="//content.jwplatform.com/libraries/XeGdlzmk.js"></script>',
                    '<div id="videoElement"> </div>',
                    '<script>var playerInstance = jwplayer("videoElement");playerInstance.setup({',
                    'file: "//playout.videojug.ws/video-files/561e5d70ef55868c4b3b642d/1461880800000/nK1efndQiJ8NMi9kj57k937mrXVPG2txtIj4AkHukzLFlF37b8wLk35JalnqM9FG/scoff%2Ffood-pornpizza-rolls_360p.mp4",',
                    'image: "https://playout.videojug.ws/lovelive-tv/image/upload/c_fill,h_360,q_50,w_640/xrvmvgnztdkogzb1qpdo.jpg",',
                    'width: 640, height: 360,',
                    'title: "Pizza Rolls",',
                    'description: "Feel like a snack but not worried about the calories? Like pizza but bored of the slice? Then try these pizza rolls - best made for sharing, you can fill them with your favourite pizza toppings (we\'ve chosen our favourite, pepperoni) and best of all they\'re really easy to make."',
                    '});</script>'
                ].join(''),
                visible: true
            }
        };

        /**
         * Define rules
         * @property ScoffModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ScoffModel.extend('ScoffModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
