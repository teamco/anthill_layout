/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineKeezMoviesEventManager(WidgetContentEventManager) {

    /**
     * Define KeezMovies event manager
     * @class KeezMoviesEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var KeezMoviesEventManager = function KeezMoviesEventManager() {

        this.updateEventList({});
    };

    return KeezMoviesEventManager.extend('KeezMoviesEventManager', {

    }, WidgetContentEventManager.prototype);
});
