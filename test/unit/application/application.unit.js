import {Application} from 'config/application';
import {mvcExpectation} from '../helpers/utils';

describe('Application', () => {
  it('Application should be created', async () => {
    const app = await Application.init();
    mvcExpectation(app);
    expect(app instanceof Application).toBeTruthy();
  });
});