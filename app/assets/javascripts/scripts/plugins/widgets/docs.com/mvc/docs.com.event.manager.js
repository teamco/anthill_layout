/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineDocsComEventManager(WidgetContentEventManager) {

    /**
     * Define DocsCom event manager
     * @class DocsComEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var DocsComEventManager = function DocsComEventManager() {

        this.updateEventList({});
    };

    return DocsComEventManager.extend(
        'DocsComEventManager', {},
        WidgetContentEventManager.prototype
    );
});
