/**
 * Created by teamco on 7/10/14.
 */

/**
 * @class ToolTipRenderer
 * @type {ToolTipRenderer}
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
   *  [container]: string,
   *  [customCss]: string
   * }} opts
   * @returns {*|jQuery}
   */
  renderTooltip(opts) {
    const $selector = opts.selector;

    const config = {
      html: true,
      title: opts.title,
      trigger: 'hover',
      placement: 'left'
    };

    if (opts.description || opts.imageUrl) {
      config.content = '';

      if (opts.description) {
        config.content += opts.description;
      }

      if (opts.imageUrl) {
        const $image = window.$('<img />').attr({
          src: opts.imageUrl,
          alt: opts.title
        }).css({cssFloat: opts.imageFloat || 'none'});

        config.content += $image[0];
      }

      this.removeOpenPopups();
      this._initPopover($selector, config);

      if (opts.customCss) {
        $selector.on('shown.bs.popover', function() {
          const popoverId = this.getAttribute('aria-describedby');
          window.$(`#${popoverId} .popover-header`).addClass(opts.customCss);
        });
      }

    } else {
      this._initTooltip($selector, config);
    }
  }

  /**
   * @memberOf ToolTipRenderer
   * @param $selector
   * @param config
   * @return {boolean}
   * @private
   */
  _initPopover($selector, config) {
    if (!$selector.popover) {
      this.view.scope.logger.warn('Undefined popover');
      return false;
    }
    $selector.attr({
      'data-toggle': 'popover',
      title: config.title
    }).popover(config);
  }

  /**
   * @memberOf ToolTipRenderer
   * @param $selector
   * @param config
   * @return {boolean}
   * @private
   */
  _initTooltip($selector, config) {
    if (!$selector.tooltip) {
      this.view.scope.logger.warn('Undefined tooltip');
      return false;
    }
    $selector.tooltip(config);
  }

  /**
   * @memberOf ToolTipRenderer
   */
  removeOpenPopups() {
    const popups = document.querySelectorAll('.popover');
    popups.forEach(popup => popup.remove());
  }
}
