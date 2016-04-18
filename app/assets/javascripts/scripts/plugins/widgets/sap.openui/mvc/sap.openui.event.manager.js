/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineSapOpenuiEventManager(WidgetContentEventManager) {

    /**
     * Define SapOpenui event manager
     * @class SapOpenuiEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var SapOpenuiEventManager = function SapOpenuiEventManager() {

        this.updateEventList({});
    };

    return SapOpenuiEventManager.extend(
        'SapOpenuiEventManager', {},
        WidgetContentEventManager.prototype
    );
});
