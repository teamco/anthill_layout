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

        // TODO Redesign
        attachEvent: function attachEvent(path) {

            /**
             * Define panel instance
             */
            var panel = this.view.scope.containment;

            this.$.on('click.toggle', function () {
                    panel.view.controller.isOpened() ?
                        panel.observer.publish(panel.eventmanager.eventList.closePanel) :
                        panel.observer.publish(panel.eventmanager.eventList.openPanel);
                }
            )

        }

    }, BaseElement.prototype);

});