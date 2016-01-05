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

        this._config(view, opts, $('<ul class="list-group" />')).build({
            $container: opts.$container
        });

        this.addCSS('maximize');

        return this;
    };

    return MaximizeElement.extend('MaximizeElement', {}, BaseElement.prototype);
});