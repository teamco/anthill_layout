/**
 * @class ContentSimulate
 * @export ContentSimulate
 */
export class ContentSimulate {
  
  /**
   * Split embedded content
   * @memberOf ContentSimulate
   * @returns {boolean}
   */
  splitEmbeddedContentSimulate() {

    /**
     * Define referrer widget
     * @type {Widget}
     */
    const widget = this.referrer;
    const subscribers = widget.controller.getSubscribers(widget.eventManager.eventList.splitEmbeddedContent);

    /**
     * Get subscribers
     * @type {*}
     */
    const scope = this.scope;

    scope.model.copyPrefs(widget);
    scope.observer.publish(scope.eventManager.eventList.splitEmbeddedContent, [subscribers, true]);
    return false;
  }

  /**
   * Set embedded content simulate
   * @memberOf ContentSimulate
   */
  setEmbeddedContentSimulate() {

    /**
     * Define scope
     * @type {*}
     */
    const content = this,
        scope = content.scope;

    scope.utils.waitFor(
        () => scope.view.get$item() && content.referrer,
        () => {
          scope.model.copyPrefs(content.referrer);
          scope.observer.publish(scope.eventManager.eventList.setEmbeddedContent);
        },
        () => scope.logger.warn('Timeout. Unable to embed content')
    );
    return false;
  }
}