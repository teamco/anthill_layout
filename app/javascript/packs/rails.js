require.context('../images/', true, /\.(gif|jpg|png|svg)$/i);

import Turbolinks from 'turbolinks';
import * as ActiveStorage from '@rails/activestorage/src';

import './scss/development.scss';
import './scss/application.scss';
import './combined';

import 'bootstrap';

import 'perfect-scrollbar/dist/perfect-scrollbar.min';
import '@coreui/coreui/dist/js/coreui.min';
import '@coreui/coreui-plugin-chartjs-custom-tooltips/dist/js/custom-tooltips.min';
import '@fortawesome/fontawesome-free/js/all.min';

import 'jquery.initialize';

require('../channels');

global['$'] = jQuery;

document.addEventListener('DOMContentLoaded', () => {
  Turbolinks.start();
  ActiveStorage.start();
});