/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineDotsubEventManager(WidgetContentEventManager) {

    /**
     * Define Dotsub event manager
     * @class DotsubEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var DotsubEventManager = function DotsubEventManager() {

        this.updateEventList({});
    };

    return DotsubEventManager.extend(
        'DotsubEventManager', {},
        WidgetContentEventManager.prototype
    );
});
