/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineNationalFilmBoardOfCanadaEventManager(WidgetContentEventManager) {

    /**
     * Define NationalFilmBoardOfCanada event manager
     * @class NationalFilmBoardOfCanadaEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var NationalFilmBoardOfCanadaEventManager = function NationalFilmBoardOfCanadaEventManager() {

        this.updateEventList({});
    };

    return NationalFilmBoardOfCanadaEventManager.extend(
        'NationalFilmBoardOfCanadaEventManager', {},
        WidgetContentEventManager.prototype
    );
});
