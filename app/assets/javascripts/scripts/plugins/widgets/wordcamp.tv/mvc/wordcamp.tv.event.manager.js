/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineWordcampTvEventManager(WidgetContentEventManager) {

    /**
     * Define WordcampTv event manager
     * @class WordcampTvEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var WordcampTvEventManager = function WordcampTvEventManager() {

        this.updateEventList({});
    };

    return WordcampTvEventManager.extend('WordcampTvEventManager', {

    }, WidgetContentEventManager.prototype);
});
