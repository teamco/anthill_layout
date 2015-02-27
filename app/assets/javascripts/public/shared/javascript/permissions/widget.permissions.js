/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:50 PM
 */

define(['config/widget'], function defineWidgetPermissions(Widget) {

    /**
     * Define Widget global permission
     * @type {{
     *      development: {maximizable: boolean, draggable: boolean, resizable: boolean},
     *      authorize: {maximizable: boolean, draggable: boolean, resizable: boolean},
     *      consumption: {maximizable: boolean, draggable: boolean, resizable: boolean},
     *      test: {maximizable: boolean, draggable: boolean, resizable: boolean}
     * }}
     */
    Widget.prototype.globalPermissions = {
        development: {
            maximizable: true,
            draggable: true,
            resizable: true
        },
        authorize: {
            maximizable: true,
            draggable: true,
            resizable: true
        },
        consumption: {
            maximizable: true,
            draggable: false,
            resizable: false
        },
        test: {
            maximizable: true,
            draggable: true,
            resizable: true
        }
    };

    return Widget;
});