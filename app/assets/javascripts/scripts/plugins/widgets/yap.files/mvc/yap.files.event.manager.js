/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineYapFilesEventManager(WidgetContentEventManager) {

    /**
     * Define YapFiles event manager
     * @class YapFilesEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var YapFilesEventManager = function YapFilesEventManager() {

        this.updateEventList({});
    };

    return YapFilesEventManager.extend('YapFilesEventManager', {

    }, WidgetContentEventManager.prototype);
});
