/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineQrCodeEventManager(WidgetContentEventManager) {

    /**
     * Define QrCode event manager
     * @class QrCodeEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var QrCodeEventManager = function QrCodeEventManager() {

        this.updateEventList({});
    };

    return QrCodeEventManager.extend('QrCodeEventManager', {

    }, WidgetContentEventManager.prototype);
});
