/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineLearningAppsEventManager(WidgetContentEventManager) {

    /**
     * Define LearningApps event manager
     * @class LearningAppsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var LearningAppsEventManager = function LearningAppsEventManager() {

        this.updateEventList({});
    };

    return LearningAppsEventManager.extend(
        'LearningAppsEventManager', {},
        WidgetContentEventManager.prototype
    );
});
