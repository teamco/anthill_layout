/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineComment(BaseElement) {

    /**
     * Define Comment
     * @param view
     * @param opts
     * @returns {WidgetCommentElement}
     * @class WidgetCommentElement
     * @constructor
     * @extends BaseElement
     */
    var WidgetCommentElement = function WidgetCommentElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderForm();

        return this;
    };

    return WidgetCommentElement.extend('WidgetCommentElement', {

        renderForm: function renderForm() {

            this.$.append(
                this.renderTextArea({
                    name: 'comment',
                    placeholder: 'Add a comment...',
                    disabled: false,
                    visible: true,
                    validate: false
                })
            );
        }

    }, BaseElement.prototype);
});