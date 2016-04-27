/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineHuffdufferEventManager(WidgetContentEventManager) {

    /**
     * Define Huffduffer event manager
     * @class HuffdufferEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var HuffdufferEventManager = function HuffdufferEventManager() {

        this.updateEventList({});
    };

    return HuffdufferEventManager.extend(
        'HuffdufferEventManager', {},
        WidgetContentEventManager.prototype
    );
});
