/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineExternalWidgetEventManager(WidgetContentEventManager) {

    /**
     * Define ExternalWidget event manager
     * @class ExternalWidgetEventManager
     * @constructor
     * @extends WidgetContentEventManager
     * @extends BaseEvent
     */
    var ExternalWidgetEventManager = function ExternalWidgetEventManager() {
    };

    return ExternalWidgetEventManager.extend('ExternalWidgetEventManager', {}, WidgetContentEventManager.prototype);
});