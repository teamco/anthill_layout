/**
 * Created by teamco on 7/10/14.
 */

/**
 * @class ToolTipRenderer
 * @type {module.ToolTipRenderer}
 */
export class ToolTipRenderer {

  /**
   * Render tooltip
   * @memberOf ToolTipRenderer
   * @param {{
   *  selector: *,
   *  title: string,
   *  [description]: string,
   *  [imageUrl]: string,
   *  [imageFloat]: string,
   *  [container]: string
   * }} opts
   * @returns {*|jQuery}
   */
  renderTooltip(opts) {
    const $selector = opts.selector;

    const config = {
      html: true,
      selector: $selector[0],
      title: opts.title,
      container: opts.container || 'body',
      trigger: 'hover',
      placement: 'auto'
    };

    if (opts.description || opts.imageUrl) {
      config.content = '';

      if (opts.description) {
        config.content += '<p>' + opts.description + '</p>';
      }

      if (opts.imageUrl) {
        const $image = $('<img />').attr({
          src: opts.imageUrl,
          alt: opts.title
        }).css({cssFloat: opts.imageFloat || 'none'});

        config.content += $image[0];
      }

      if (!$selector.popover) {
        this.element.view.scope.logger.warn('Undefined popover');
        return false;
      }

      $selector.attr({
        'data-toggle': 'popover',
        title: config.title
      }).popover(config);

    } else {
      if (!$selector.tooltip) {
        this.element.view.scope.logger.warn('Undefined tooltip');
        return false;
      }
      $selector.tooltip(config);
    }
  }
}
