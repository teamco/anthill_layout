/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/24/15
 * Time: 7:31 PM
 */

/**
 * @class FilterRenderer
 * @type {FilterRenderer}
 */
export class FilterRenderer {

  /**
   * @constructor
   * @param {BaseElement} element
   */
  constructor(element) {

    /**
     * @property FilterRenderer
     * @type {BaseElement}
     */
    this.element = element;
  }

  /**
   * Render iframe
   * @memberOf FilterRenderer
   * @param {{
   *  text: string,
   *  name: string,
   *  placeholder: string,
   *  visible: boolean,
   *  [enter]: boolean,
   *  callback: function,
   *  [items]
   * }} opts
   * @returns {*|jQuery}
   */
  renderFilter(opts) {

    // Get scope
    const scope = this.view.scope,
        filterEvent = 'keyup.' + scope.name.toLowerCase() + '-search';

    // Define items setter
    this.items = opts.items;

    /**
     * Define $search
     * @type {jQuery}
     */
    const $search = this.renderTextField({
      text: opts.text,
      name: opts.name,
      type: 'panel-filter',
      placeholder: opts.placeholder,
      monitor: {
        events: [filterEvent],
        callback: this.filterResults.bind({
          callback: opts.callback,
          enter: opts.enter,
          $element: this
        })
      },
      visible: opts.visible
    });

    scope.logger.debug('Search field params', opts);

    /**
     * Define $reset
     * @type {*|jQuery|{find}}
     */
    const $reset = window.$(`<div class="input-group-append">
        <button type="button" class="btn btn-secondary rounded-0 d-none reset-filter" title="Reset">
          <span class="fa fa-times"></span>
        </button>
      </div>`);

    $reset.find('button').on('click.reset', function reset() {

      /**
       * Get $node
       * @type {*|jQuery|HTMLElement|{parents, parent}}
       */
      const $node = window.$(this);

      $node.parents('.filter').find('input').val('').trigger(filterEvent).focus();
      $node.parent().addClass('d-none');
    });

    $search.append($reset);
    return $search;
  }

  /**
   * Update items
   * @memberOf FilterRenderer
   * @param {{items, [focusOn]}} opts
   */
  updateData(opts) {
    this.items = opts.items;
    this.focusOn(opts.focusOn);
  }

  /**
   * Filter search results
   * @memberOf FilterRenderer
   * @param {Event|{which}} e
   */
  filterResults(e) {
    e.preventDefault();

    const input = e.target;
    const $filter = this.$element;
    const $reset = $filter.$.find('button');

    const items = $filter.items,
        value = input.value;

    /**
     * Get logger
     * @type {Logger|{debug, warn}}
     */
    const logger = $filter.view.scope.logger;

    /**
     * Define filter
     * @returns {boolean}
     * @private
     */
    function _filter() {
      $reset[(value.length ? 'remove' : 'add') + 'Class']('d-none');

      for (let index in items) {
        if (Object.prototype.hasOwnProperty.call(items, index)) {

          /**
           * Define item
           * @type {{$, name: string, description: string, [type]: string, value, data}}
           */
          const $item = items[index];

          if (!value.length) {
            $item.$.removeClass('d-none');
          } else {
            const regex = new RegExp(value, 'ig');

            if (!$item.data) {
              logger.warn('Item has no data', $item);
              return false;
            }

            // Define matchers
            const nameMatch = ($item.data.name || '').match(regex),
                typeMatch = ($item.data.type || '').match(regex),
                descriptionMatch = ($item.data.description || '').match(regex);

            const condition = nameMatch || typeMatch || descriptionMatch;
            $item.$[(condition ? 'remove' : 'add') + 'Class']('d-none');
          }
        }
      }
    }

    if (e.which === 13) {
      if (this.enter) {
        logger.debug('Filter results on enter');
        _filter();
      } else {
        logger.debug('Do nothing on enter');
        return false;
      }

    } else {

      if (e.which === 27) {
        input.value = '';
        $reset.addClass('d-none');
        logger.debug('Clear results on escape');
      }

      logger.debug('Filter results');

      if (this.enter) {
        logger.debug('Do nothing on key up');
        return false;
      }

      _filter();
    }

    if (typeof(this.callback) === 'function') {

      // Execute callback
      this.callback();
    }
  }
}
  