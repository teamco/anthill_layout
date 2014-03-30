/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineEmptyController(PluginBase, WidgetContentController) {

    /**
     * Define empty controller
     * @class EmptyController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EmptyController = function EmptyController() {
    };

    return EmptyController.extend('EmptyController', {



    }, PluginBase.prototype, WidgetContentController.prototype);
});