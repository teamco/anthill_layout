/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseModel} from '../../modules/Model';
import {Page} from '../config/page';

/**
 * @constant WorkspaceModel
 * @type {WorkspaceModel}
 * @extends BaseModel
 */
export class WorkspaceModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'WorkspaceModel', scope);

    /**
     * Define item
     * @property WorkspaceModel
     * @type {Page}
     */
    this.item = Page;

    /**
     * Skip transfer preferences
     * @property WorkspaceModel
     * @type {string[]}
     */
    this.skipPreferencesOn = [
      'cloneItemContent'
    ];
  }

  /**
   * Set static width
   * @memberOf WorkspaceModel
   * @param {boolean} width
   */
  setStaticWidth(width) {

    // Define config
    const config = this.scope.config;

    config.preferences.staticWidth = width;
    config.isResized = !width;
  }

  /**
   * Set Site Width Slider
   * @memberOf WorkspaceModel
   * @param {number} width
   */
  setSiteWidthSlider(width) {

    this._setItemInfoPreferences('siteWidthSlider', width);

    /**
     * Set local scope
     * @type {Workspace}
     */
    const scope = this.scope;

    scope.observer.publish(
        scope.eventManager.eventList.updatePagesWidth
    );
  }

  /**
   * Set site title
   * @memberOf WorkspaceModel
   * @param {string} title
   */
  setSiteTitle(title) {

    /**
     * Set local scope
     * @type {Workspace}
     */
    const scope = this.scope;

    this._setItemInfoPreferences('siteTitle', title);

    scope.observer.publish(
        scope.eventManager.eventList.updateSiteTitle
    );
  }

  /**
   * Set site author
   * @memberOf WorkspaceModel
   * @param {string} author
   */
  setSiteAuthor(author) {

    /**
     * Set local scope
     * @type {Workspace}
     */
    const scope = this.scope;

    this._setItemInfoPreferences('siteAuthor', author);
    scope.observer.publish(scope.eventManager.eventList.updateSiteAuthor);
  }

  /**
   * Set site description
   * @memberOf WorkspaceModel
   * @param {string} description
   */
  setSiteDescription(description) {

    /**
     * Set local scope
     * @type {Workspace}
     */
    const scope = this.scope;

    this._setItemInfoPreferences('siteDescription', description);
    scope.observer.publish(scope.eventManager.eventList.updateSiteDescription);
  }

  /**
   * Set site keywords
   * @memberOf WorkspaceModel
   * @param {string} keywords
   */
  setSiteKeywords(keywords) {

    /**
     * Set local scope
     * @type {Workspace}
     */
    const scope = this.scope;

    this._setItemInfoPreferences('siteKeywords', keywords);
    scope.observer.publish(scope.eventManager.eventList.updateSiteKeywords);
  }

  /**
   * Define clone item content
   * @memberOf WorkspaceModel
   * @param {string} itemUUID
   */
  setCloneItemContent(itemUUID) {

    /**
     * Get scope
     * @type {Workspace}
     */
    const scope = this.scope;

    scope.observer.publish(scope.eventManager.eventList.clonePage, itemUUID);
  }

  /**
   * Define load pages
   * @memberOf WorkspaceModel
   */
  loadPages() {

    this.scope.controller.setAsLoading(true);

    /**
     * Get collector
     * @type {object}
     */
    const collector = this.getCollector(this.item);
    this.loadData(this.item, collector);
  }
}
  