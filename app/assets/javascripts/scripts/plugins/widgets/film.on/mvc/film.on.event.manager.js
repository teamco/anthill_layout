/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineFilmOnEventManager(WidgetContentEventManager) {

    /**
     * Define FilmOn event manager
     * @class FilmOnEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var FilmOnEventManager = function FilmOnEventManager() {

        this.updateEventList({});
    };

    return FilmOnEventManager.extend('FilmOnEventManager', {

    }, WidgetContentEventManager.prototype);
});
