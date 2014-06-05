/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineDropboxEventManager(WidgetContentEventManager) {

    /**
     * Define Dropbox event manager
     * @class DropboxEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var DropboxEventManager = function DropboxEventManager() {

        this.updateEventList({});
    };

    return DropboxEventManager.extend('DropboxEventManager', {

    }, WidgetContentEventManager.prototype);
});