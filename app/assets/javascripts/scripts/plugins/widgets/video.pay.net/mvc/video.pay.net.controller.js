/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineVideoPayNetController(PluginBase, WidgetContentController) {

    /**
     * Define VideoPayNet controller
     * @class VideoPayNetController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var VideoPayNetController = function VideoPayNetController() {
    };

    return VideoPayNetController.extend('VideoPayNetController', {

        /**
         * Set embedded content
         * @member VideoPayNetController
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
         * Add VideoPayNet rule
         * @member VideoPayNetController
         * @param e
         */
        addVideoPayNetRule: function addVideoPayNetRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
