/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePagesContentElement(BaseElement) {

    /**
     * Define Pages Content Element
     * @param view
     * @param opts
     * @returns {PagesContentElement}
     * @constructor
     * @class PagesContentElement
     */
    var PagesContentElement = function PagesContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.setAttributes(opts.data);

        this.installWidget();

        return this;
    };

    return PagesContentElement.extend({

        setAttributes: function setAttributes(data) {

            this.$.attr({
                title: data.name,
                rel: data.description,
                resource: data.resource
            });
        },

        installWidget: function installWidget() {

            this.$.on('click.install', function clickInstall() {
                this.view.controller.addWidget(this);
            }.bind(this))
        }

    }, BaseElement.prototype);

});