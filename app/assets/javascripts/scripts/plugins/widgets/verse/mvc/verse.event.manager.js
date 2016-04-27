/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineVerseEventManager(WidgetContentEventManager) {

    /**
     * Define Verse event manager
     * @class VerseEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var VerseEventManager = function VerseEventManager() {

        this.updateEventList({});
    };

    return VerseEventManager.extend(
        'VerseEventManager', {},
        WidgetContentEventManager.prototype
    );
});
