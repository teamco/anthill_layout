/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineEmbedlyElement(BaseElement) {

    /**
     * Define Embedly Element
     * @param view
     * @param opts
     * @returns {EmbedlyElement}
     * @constructor
     * @class EmbedlyElement
     * @extends BaseElement
     */
    var EmbedlyElement = function EmbedlyElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('embedly', {resource: '/widgets'});

        return this;
    };

    return EmbedlyElement.extend('EmbedlyElement', {

        /**
         * Render Embedded content
         * @memberOf EmbedlyElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {

            /**
             * Update content
             * @param json
             * @param {string} status
             * @param xhr
             * @private
             */
            function _updateContent(json, status, xhr){
                this.$.append(JSON.stringify(json));
            }

            /**
             * Get scope
             * @type {Embedly|AntHill}
             */
            var scope = this.view.scope,
                route = scope.model.getConfig('routes/getContent');

            if (_.isUndefined(url)) {

                scope.logger.debug('Initial content');
                return false;
            }

            $.ajax({
                url: route[0],
                method: route[1],
                data: {
                    url: url
                }
            }).done(_updateContent.bind(this));
        }

    }, BaseElement.prototype);
});
