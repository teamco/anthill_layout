/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineEspresoTvEventManager(WidgetContentEventManager) {

    /**
     * Define EspresoTv event manager
     * @class EspresoTvEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var EspresoTvEventManager = function EspresoTvEventManager() {

        this.updateEventList({});
    };

    return EspresoTvEventManager.extend('EspresoTvEventManager', {

    }, WidgetContentEventManager.prototype);
});
