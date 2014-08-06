/**
 * Created by i061485 on 7/10/14.
 */

define([], function defineEventLinkRenderer(){

    /**
     * Define EventLinkRenderer
     * @class EventLinkRenderer
     * @extends LabelRenderer
     * @constructor
     */
    var EventLinkRenderer = function EventLinkRenderer(){

    };

    return EventLinkRenderer.extend('EventLinkRenderer', {

        /**
         * Render link event
         * @memberOf EventLinkRenderer
         * @param opts
         * @returns {*|jQuery}
         */
        renderEventLink: function renderEventLink(opts) {

            /**
             * Create UUID
             * @type {String}
             */
            var uuid = this.base.lib.generator.UUID() + '-event',
                checked = !!this.defaultPrefs[opts.name].checked;

            var $input = $('<input />').attr({
                name: opts.group,
                type: 'radio',
                checked: checked
            });

            if (checked) {
                $input.val(opts.name);
            }

            /**
             * Define $link
             * @type {*|jQuery}
             */
            var $link = $('<div />').attr({
                rel: opts.name,
                id: uuid,
                title: opts.title
            }).text(opts.title).
                addClass(opts.name.toDash()).
                append($input);

            $input.prop(
                'checked',
                checked
            );

            $link.on(
                opts.events.join(' '),

                /**
                 * On event
                 * @private
                 */
                function _onEvent(e) {

                    e.preventDefault();
                    e.stopPropagation();

                    /**
                     * Define widget content
                     * @type {WidgetContent}
                     */
                    var content = this.view.scope;

                    // Reset to default value
                    $('input:radio[name="' + opts.group + '"]').val('on');

                    // Set new value
                    $('input', $(e.target)).prop({
                        checked: true
                    }).val(opts.name);

                    content.observer.publish(
                        content.eventmanager.eventList.executeOnWidgetEvent,
                        opts.name
                    );

                }.bind(this)
            );

            if (!opts.visible) {
                $link.hide();
            }

            return $link;
        }
    });
});