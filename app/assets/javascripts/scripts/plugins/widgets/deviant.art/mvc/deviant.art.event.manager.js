/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineDeviantArtEventManager(WidgetContentEventManager) {

    /**
     * Define DeviantArt event manager
     * @class DeviantArtEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var DeviantArtEventManager = function DeviantArtEventManager() {

        this.updateEventList({});
    };

    return DeviantArtEventManager.extend('DeviantArtEventManager', {

    }, WidgetContentEventManager.prototype);
});
