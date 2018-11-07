/**
 * @class LayoutGrid
 * @type {LayoutGrid}
 */
export class LayoutGrid {

  /**
   * @param {Layout} layout
   * @constructor
   */
  constructor(layout) {

    /**
     * Define layout
     * @property LayoutGrid
     * @type {Layout}
     */
    this.layout = layout;
  }

  /**
   * toggleGrid
   * @method toggleGrid
   * @property LayoutGrid
   * @param {Page} page
   * @param {number} cellWidth
   */
  toggleGrid(page, cellWidth) {
    const $page = page.view.get$item().$,
        remove = $page.hasClass('grid');
    $page[(remove ? 'remove' : 'add') + 'Class']('grid');
    $page.css({backgroundSize: cellWidth + 'px ' + cellWidth + 'px'});
  }
}
