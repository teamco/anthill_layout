import {config} from './javascript/config';
import {listeners} from './javascript/listeners';
import {permissions} from './javascript/permissions';

listeners.application();
listeners.workspace();
listeners.page();
listeners.layout();
listeners.widget();

permissions.application();
permissions.workspace();
permissions.page();
permissions.layout();
permissions.widget();

export default config;