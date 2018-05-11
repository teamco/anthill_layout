/**
 * Created by teamco on 8/12/15.
 */

/**
 * Define fixes for vulnerabilities
 * @class BehaviorFixVulnerabilities
 */
module.exports = class BehaviorFixVulnerabilities {

  /**
   * Define fix for ClickJacking
   * @memberOf BehaviorFixVulnerabilities
   */
  fixClickJacking() {

    if (window.top !== window) {

      // Redirect to window.location
      window.top.location = window.location;
      this.scope.observer.publish(this.scope.eventManager.eventList.handleVulnerabilities, 'ClickJacking');
    }
  }

  /**
   * Define after Handle Vulnerabilities
   * @memberOf BehaviorFixVulnerabilities
   * @param data
   */
  afterHandleVulnerabilities(data) {

    // TODO
    debugger;
  }

  /**
   * Define fix for ClickJacking
   * @memberOf BehaviorFixVulnerabilities
   * @param {string} type
   */
  handleVulnerabilities(type) {

    const route = this.model.getConfig('routes/handleVulnerabilities'),
        appName = this.model.getConfig('appName');

    $.ajax({

      dataType: 'json',

      url: route[0],
      method: route[1],

      data: this.controller.prepareXhrData({
        key: appName,
        type: type
      })

    }).done(
        function done(data, type, xhr) {

          this.logger.debug(arguments);
          this.observer.publish(
              this.eventManager.eventList.afterHandleVulnerabilities,
              data
          );

        }.bind(this)
    );
  }
};
