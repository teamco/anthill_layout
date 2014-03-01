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
     */
    var BarContentElement = function BarContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.attachEvent(opts.path);

        return this;
    };

    return BarContentElement.extend({

        /**
         * Open tab
         * @param path
         */
        attachEvent: function attachEvent(path) {

            /**
             * Define panel instance
             */
            var panel = this.view.scope.containment,
                publish = panel.observer.publish.bind(panel.observer),
                event = panel.eventmanager.eventList;

            this.$.on('click.toggle', function clickToggle() {
                    panel.view.controller.isOpened() ?
                        publish(event.closePanel, path) :
                        publish(event.openPanel, path);
                }
            )

        }

    }, BaseElement.prototype);

});