/**
 * Created by teamco on 7/10/14.
 */

import {LibGenerator} from 'js/modules/base/Generator';

/**
 * @class EventLinkRenderer
 * @type {EventLinkRenderer}
 */
export class EventLinkRenderer {

  /**
   * Render link event
   * @memberOf EventLinkRenderer
   * @param opts
   * @returns {*|jQuery}
   */
  renderEventLink(opts) {

    /**
     * Create UUID
     * @type {string}
     */
    const uuid = LibGenerator.UUID() + '-event';
    const checked = !!opts.checked;

    const $input = $('<input />').attr({
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
    const $link = $('<div />').attr({
      rel: opts.name,
      id: uuid,
      title: opts.title
    }).text(opts.title).addClass(opts.name.toDash()).append($input);

    $input.prop('checked', checked);

    /**
     * Define widget content
     * @type {WidgetContent}
     */
    const content = this.view.scope;

    /**
     * Define monitor
     * @type {{events: *, callback: (function(this:EventLinkRenderer))}}
     */
    opts.monitor = {
      events: opts.events,
      callback(e) {

        e.preventDefault();
        e.stopPropagation();

        // Reset to default value
        $('input:radio[name="' + opts.group + '"]').val('on');

        // Set new value
        $('input', $(e.target)).prop({checked: true}).val(opts.name);

        content.observer.publish(content.eventManager.eventList.executeOnWidgetEvent, opts.name);
      }
    };

    this.initMonitor($link, opts.monitor);
    this.checkVisibility($link, this.view.utils.setBoolean(opts.visible, true));

    return $link;
  }
}