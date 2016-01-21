/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineLifestreamController(PluginBase, WidgetContentController) {

    /**
     * Define Lifestream controller
     * @class LifestreamController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LifestreamController = function LifestreamController() {
    };

    return LifestreamController.extend('LifestreamController', {

        /**
         * Set embedded content
         * @memberOf LifestreamController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            var prefs = this.model.getAllContentPrefs(),
                index, opts = [], value,
                service, condition;

            for (index in prefs) {

                if (prefs.hasOwnProperty(index)) {

                    // Get prefs
                    value = this.model.getPrefs(index);

                    if (this.base.isDefined(value)) {

                        // Get service name
                        service = index.toLowerCase().
                            replace(this.name.toLowerCase(), '');

                        condition =
                            service.match(/user/) ||
                            service.match(/url/);

                        if (condition && value.length > 0) {
                            opts.push({
                                service: service.replace(/user/, '').
                                    replace(/url/, ''),
                                user: value
                            });
                        }
                    }
                }
            }

            this.view.get$item().renderEmbeddedContent(opts);
        },

        /**
         * Add Lifestream rule
         * @memberOf LifestreamController
         * @param e
         */
        addLifestreamRule: function addLifestreamRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
