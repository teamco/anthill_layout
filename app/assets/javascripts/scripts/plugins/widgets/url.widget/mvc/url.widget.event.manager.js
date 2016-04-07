/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineUrlWidgetEventManager(WidgetContentEventManager) {

    /**
     * Define UrlWidget event manager
     * @class UrlWidgetEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var UrlWidgetEventManager = function UrlWidgetEventManager() {

        this.updateEventList({});
    };

    return UrlWidgetEventManager.extend(
        'UrlWidgetEventManager', {},
        WidgetContentEventManager.prototype
    );
});
