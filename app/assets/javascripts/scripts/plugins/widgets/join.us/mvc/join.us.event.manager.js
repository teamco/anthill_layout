/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineJoinUsEventManager(WidgetContentEventManager) {

    /**
     * Define JoinUs event manager
     * @class JoinUsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var JoinUsEventManager = function JoinUsEventManager() {

        this.updateEventList({});
    };

    return JoinUsEventManager.extend(
        'JoinUsEventManager', {},
        WidgetContentEventManager.prototype
    );
});
