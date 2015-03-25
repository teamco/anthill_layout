/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFlipPdfEventManager(WidgetContentEventManager) {

    /**
     * Define FlipPdf event manager
     * @class FlipPdfEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FlipPdfEventManager = function FlipPdfEventManager() {

        this.updateEventList({});
    };

    return FlipPdfEventManager.extend('FlipPdfEventManager', {

    }, WidgetContentEventManager.prototype);
});
