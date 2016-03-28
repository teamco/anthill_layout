/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */
define([
    'plugins/plugin.element'
], function defineBarContentElement(PluginElement) {

    /**
     * Define Bar Content Element
     * @param view
     * @param opts
     * @returns {BarContentElement}
     * @constructor
     * @class BarContentElement
     * @extends PluginElement
     * @extends Renderer
     */
    var BarContentElement = function BarContentElement(view, opts) {

        /**
         * Define resource
         * @property BarContentElement
         */
        this.resource = opts.resource;

        this._config(view, opts, $(this.getTemplate())).build({
            $container: opts.$container,
            destroy: true
        });

        this.attachEvent(opts.cname);

        return this;
    };

    return BarContentElement.extend('BarContentElement', {

        /**
         * Define template
         * @memberOf BarContentElement
         * @returns {string}
         */
        getTemplate: function getTemplate() {

            // Get module name
            var name = this.resource.module.name;

            return [
                '<li><a title="', name.humanize(), '">',
                '<i class="fa ', name.toDash(), '"></i><span>',
                name.humanize(), '</span></a></li>'
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
            var panel = this.view.scope.containment;

            var publish = panel.observer.publish.bind(panel.observer),
                event = panel.eventmanager.eventList;

            this.$.on(
                'click.toggle',
                function clickToggle() {
                    panel.view.controller.isOpened() ?
                        publish(event.closePanel, resource) :
                        publish(event.openPanel, resource);
                }
            );
        }

    }, PluginElement.prototype);
});