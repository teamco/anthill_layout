/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineEmptyController(PluginBase, WidgetBase) {

    /**
     * Define empty controller
     * @class EmptyController
     * @extends PluginController
     * @extends WidgetController
     * @constructor
     */
    var EmptyController = function EmptyController() {
    };

    return EmptyController.extend('EmptyController', {



    }, PluginBase.prototype, WidgetBase.prototype);
});