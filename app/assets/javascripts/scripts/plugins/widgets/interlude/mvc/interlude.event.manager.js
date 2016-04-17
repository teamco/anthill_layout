/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineInterludeEventManager(WidgetContentEventManager) {

    /**
     * Define Interlude event manager
     * @class InterludeEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var InterludeEventManager = function InterludeEventManager() {

        this.updateEventList({});
    };

    return InterludeEventManager.extend(
        'InterludeEventManager', {},
        WidgetContentEventManager.prototype
    );
});
