/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

define([

], function defineWidgetControllerBase() {

    var WidgetController = function WidgetController() {

    };

    return WidgetController.extend({

        /**
         * Init widget
         */
        initWidget: function initWidget() {

            this.observer.publish(
                this.eventmanager.eventList.successCreated
            );

            this.observer.publish(
                this.eventmanager.eventList.defineContainer
            );

            this.observer.publish(
                this.eventmanager.eventList.updateTranslations, [
                    'plugins/widgets/',
                    this.constructor.name.toLowerCase(),
                    '/translations/en-us'
                ].join('')
            );

            this.view.render();
        },

        /**
         * Define container
         */
        defineContainer: function defineContainer() {

            /**
             * Define widget
             * @type {*}
             */
            var widget = this.controller.getContainment();

            /**
             * Define $container
             * @type {modules.view.elements.$content|*|element.page.page.element}
             */
            this.view.elements.$container =
                widget.view.elements.$content;
        }
    });

});