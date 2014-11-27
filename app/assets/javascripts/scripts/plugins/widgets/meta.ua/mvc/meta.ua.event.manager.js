/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineMetaUaEventManager(WidgetContentEventManager) {

    /**
     * Define MetaUa event manager
     * @class MetaUaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var MetaUaEventManager = function MetaUaEventManager() {

        this.updateEventList({});
    };

    return MetaUaEventManager.extend('MetaUaEventManager', {

    }, WidgetContentEventManager.prototype);
});
