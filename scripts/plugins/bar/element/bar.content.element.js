/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineBarContentElement(BaseElement) {

    /**
     * Define Bar Content Element
     * @param view
     * @param opts
     * @returns {BarContentElement}
     * @constructor
     * @class BarContentElement
     * @extends BaseElement
     */
    var BarContentElement = function BarContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.attachEvent(opts.resource);

        return this;
    };

    return BarContentElement.extend({

        /**
         * Open tab
         * @memberOf BarContentElement
         * @param resource
         */
        attachEvent: function attachEvent(resource) {

            /**
             * Define panel instance
             */
            var panel = this.view.scope.containment,
                publish = panel.observer.publish.bind(panel.observer),
                event = panel.eventmanager.eventList;

            this.$.on('click.toggle', function clickToggle() {
                    panel.view.controller.isOpened() ?
                        publish(event.closePanel, resource) :
                        publish(event.openPanel, resource);
                }
            )

        }

    }, BaseElement.prototype);

});