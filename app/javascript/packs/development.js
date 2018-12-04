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

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const script = document.querySelector('script#require-init'),
        data = script.dataset || {};

    const site = data.resource,
        uuid = data.uuid,
        version = parseInt(data.current || 0, 10) || 1,
        user = data.user,
        mode = data.mode,
        activated = data.activated,
        environment = data.environment;

    const defaults = {
      user: user,
      uuid: uuid,
      version: version,
      activate: activated === 'true',
      environment: environment,
      appName: site,
      mode: mode
    };

    import(`./public/${site}/index`).then(config => {
      window.anthill = new Application({config: {...config.default, ...defaults} || {}});
    });
  });
})();