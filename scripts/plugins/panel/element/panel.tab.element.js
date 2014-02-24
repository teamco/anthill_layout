/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePanelTabElement(BaseElement) {

    /**
     * Define Panel Tab Element
     * @param view
     * @param opts
     * @returns {PanelTabElement}
     * @constructor
     * @class PanelTabElement
     */
    var PanelTabElement = function PanelTabElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.bindToggle();

        return this;
    };

    return PanelTabElement.extend({

        /**
         * Bind toggle
         */
        bindToggle: function bindToggle() {

            /**
             * Define panel instance
             */
            var panel = this.view.scope;

            this.$.on('click.toggle', function () {
                    this.view.controller.isOpened() ?
                        panel.observer.publish(panel.eventmanager.eventList.closePanel) :
                        panel.observer.publish(panel.eventmanager.eventList.openPanel);
                }.bind(this)
            )
        }

    }, BaseElement.prototype);

});