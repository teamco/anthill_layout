/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePicasaEventManager(WidgetContentEventManager) {

    /**
     * Define Picasa event manager
     * @class PicasaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PicasaEventManager = function PicasaEventManager() {

        this.updateEventList({});
    };

    return PicasaEventManager.extend('PicasaEventManager', {

    }, WidgetContentEventManager.prototype);
});
