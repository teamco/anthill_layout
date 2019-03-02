/**
 * @export initReporter
 * @param {boolean} clear
 */
export const initReporter = (clear = false) => {

  /**
   * @constant
   * @type {Reporter}
   */
  const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

  if (clear) {
    // remove default reporter logs
    jasmine.getEnv().clearReporters();
  }

  // add jasmine-spec-reporter
  jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
      displayPending: true,
      displayStacktrace: true
    }
  }));
};