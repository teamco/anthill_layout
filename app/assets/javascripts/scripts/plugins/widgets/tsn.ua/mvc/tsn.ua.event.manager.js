/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineTsnUaEventManager(WidgetContentEventManager) {

    /**
     * Define TsnUa event manager
     * @class TsnUaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var TsnUaEventManager = function TsnUaEventManager() {

        this.updateEventList({});
    };

    return TsnUaEventManager.extend('TsnUaEventManager', {

    }, WidgetContentEventManager.prototype);
});
