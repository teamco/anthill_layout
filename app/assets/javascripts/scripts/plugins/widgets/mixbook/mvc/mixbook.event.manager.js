/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineMixbookEventManager(WidgetContentEventManager) {

    /**
     * Define Mixbook event manager
     * @class MixbookEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var MixbookEventManager = function MixbookEventManager() {

        this.updateEventList({});
    };

    return MixbookEventManager.extend('MixbookEventManager', {

    }, WidgetContentEventManager.prototype);
});
