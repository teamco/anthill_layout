require.context('../images/', true, /\.(gif|jpg|png|svg)$/i);

import './scss/development.scss';
import './scss/application.scss';
import './scss/jquery-ui.min.scss';
import './combined';

import Turbolinks from 'turbolinks';

import 'bootstrap';

import 'perfect-scrollbar/dist/perfect-scrollbar.min';
import '@coreui/coreui/dist/js/coreui.min';
import '@coreui/coreui-plugin-chartjs-custom-tooltips/dist/js/custom-tooltips.min';
import '@fortawesome/fontawesome-free/js/all.min';

import 'jquery.initialize';

import {Application} from './core/config/application';

document.addEventListener('DOMContentLoaded', () => Turbolinks.start());

document.onreadystatechange = async () => {
  if (document.readyState === 'complete') {
    window.anthill = await Application.init();
  }
};