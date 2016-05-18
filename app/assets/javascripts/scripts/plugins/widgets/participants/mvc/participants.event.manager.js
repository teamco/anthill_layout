/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineParticipantsEventManager(WidgetContentEventManager) {

    /**
     * Define Participants event manager
     * @class ParticipantsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var ParticipantsEventManager = function ParticipantsEventManager() {

        this.updateEventList({});
    };

    return ParticipantsEventManager.extend(
        'ParticipantsEventManager', {},
        WidgetContentEventManager.prototype
    );
});
