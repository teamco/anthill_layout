/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:50 PM
 */

define(['config/widget'], function defineWidgetPermissions(Widget) {

    /**
     * Define Widget Local permission
     * @type {{
     *      development: {draggable: boolean, resizable: boolean},
     *      authorize: {draggable: boolean, resizable: boolean},
     *      consumption: {draggable: boolean, resizable: boolean},
     *      test: {draggable: boolean, resizable: boolean}
     * }}
     */
    Widget.prototype.localPermissions = {
        development: {
            draggable: true,
            resizable: true
        },
        authorize: {
            draggable: true,
            resizable: true
        },
        consumption: {
            draggable: false,
            resizable: false
        },
        test: {
            draggable: true,
            resizable: true
        }
    };

    return Widget;
});