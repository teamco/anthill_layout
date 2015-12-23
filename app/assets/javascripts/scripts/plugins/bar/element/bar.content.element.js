/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineBarContentElement(BaseElement) {

    /**
     * Define Bar Content Element
     * @param view
     * @param opts
     * @returns {BarContentElement}
     * @constructor
     * @class BarContentElement
     * @extends BaseElement
     * @extends Renderer
     */
    var BarContentElement = function BarContentElement(view, opts) {

        this._config(view, opts, $(this.getTemplate())).build({
            $container: opts.$container,
            destroy: true
        });

        /**
         * Define resource
         * @property BarContentElement
         */
        this.resource = opts.resource;

        this.attachEvent(opts.cname);

        return this;
    };

    return BarContentElement.extend('BarContentElement', {

        getTemplate: function getTemplate() {
            return [
                '<li><a href="#"><i class="{icon}"></i>{titlebarc}</a></li>'
            ].join('');
        },

        /**
         * Open tab
         * @memberOf BarContentElement
         * @param resource
         */
        attachEvent: function attachEvent(resource) {

            /**
             * Define panel instance
             * @type {Panel}
             */
            var panel = this.view.scope.containment,
                publish = panel.observer.publish.bind(panel.observer),
                event = panel.eventmanager.eventList;

            this.$.on(
                'click.toggle',
                function clickToggle() {
                    panel.view.controller.isOpened() ?
                        publish(event.closePanel, resource) :
                        publish(event.openPanel, resource);
                }
            );

            this.renderTooltip({
                title: this.resource.module.name.humanize(),
                selector: this,
                container: '#' + this.$.parents('.panel-container').attr('id')
            });
        }

    }, BaseElement.prototype);

});