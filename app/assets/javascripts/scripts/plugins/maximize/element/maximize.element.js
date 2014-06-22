/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMaximizeElement(BaseElement) {

    /**
     * Define Maximize Element
     * @param view
     * @param opts
     * @returns {MaximizeElement}
     * @constructor
     * @class MaximizeElement
     * @extends BaseElement
     */
    var MaximizeElement = function MaximizeElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('maximize');
        this.addCSS('preferences');

        return this;
    };

    return MaximizeElement.extend('MaximizeElement', {

        /**
         * Get footer html
         * @member MaximizeElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.base.lib.hash.hashLength(
                    this.view.scope.controller.getData()
                ),
                'items'
            ].join(' '));
        }

    }, BaseElement.prototype);

});