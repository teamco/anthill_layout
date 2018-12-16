import './stylesheets/jquery-ui.min.scss';
import './stylesheets/development.scss';

import 'jquery-ui/ui/core';
import 'jquery-ui/ui/labels';
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/mouse';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/selectable';
import 'jquery-ui/ui/widgets/sortable';

import 'jquery.initialize';

import {Application} from './core/config/application';

const complete = setInterval(async () => {
  if (document.readyState === 'complete') {
    await Application.init();
    clearInterval(complete);
  }
}, 200);