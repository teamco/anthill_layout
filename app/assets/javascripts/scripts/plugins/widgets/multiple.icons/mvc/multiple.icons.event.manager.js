/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineMultipleIconsEventManager(WidgetContentEventManager) {

    /**
     * Define MultipleIcons event manager
     * @class MultipleIconsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var MultipleIconsEventManager = function MultipleIconsEventManager() {

        this.updateEventList({});
    };

    return MultipleIconsEventManager.extend('MultipleIconsEventManager', {

    }, WidgetContentEventManager.prototype);
});