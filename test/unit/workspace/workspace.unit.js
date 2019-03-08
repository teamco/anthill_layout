import {Workspace} from 'config/workspace';
import {mvcExpectation} from '../helpers/utils';

describe('Workspace', () => {

  /**
   * @constant
   * @type {Workspace}
   */
  const workspace = new Workspace({});
  mvcExpectation(workspace);
});