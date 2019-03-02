import {Application} from 'config/application';
import {mvcExpectation} from '../helpers/utils';

describe('Application', () => {

  /**
   * @constant
   * @type {Promise<void>}
   */
  const appPromise = Application.init();

  appPromise.then(app => {
    mvcExpectation(app);
  });
});