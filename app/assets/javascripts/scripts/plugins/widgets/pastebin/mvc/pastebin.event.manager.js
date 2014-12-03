/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function definePastebinEventManager(WidgetContentEventManager) {

    /**
     * Define Pastebin event manager
     * @class PastebinEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var PastebinEventManager = function PastebinEventManager() {

        this.updateEventList({});
    };

    return PastebinEventManager.extend('PastebinEventManager', {

    }, WidgetContentEventManager.prototype);
});
