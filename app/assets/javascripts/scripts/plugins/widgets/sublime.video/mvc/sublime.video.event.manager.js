/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineSublimeVideoEventManager(WidgetContentEventManager) {

    /**
     * Define SublimeVideo event manager
     * @class SublimeVideoEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var SublimeVideoEventManager = function SublimeVideoEventManager() {

        this.updateEventList({});
    };

    return SublimeVideoEventManager.extend('SublimeVideoEventManager', {

    }, WidgetContentEventManager.prototype);
});
