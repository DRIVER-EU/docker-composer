import Vue from 'vue';
import Vuetify from 'vuetify';
import { AppState, CsApp, DatasourceManager } from '@csnext/cs-client';
import { IState } from './classes/state';
import { IContent } from './classes/content';
import { IConfig } from './classes/config';
import { YamlDatasourceProcessor } from './datasources/yaml-datasource-processor';
import Overview from './components/overview/overview';
import Home from './components/home/home';
import './../node_modules/vuetify/dist/vuetify.min.css';
import './main.css';
import Compose from './components/compose/compose';

Vue.use(Vuetify);

(() => new Vue({
  el: '#app',
  render: h => h(CsApp)
}))();

const app = AppState.Instance;
DatasourceManager.add(new YamlDatasourceProcessor());

app.project = {
  header: {
    title: 'Composer',
    logo: 'https://avatars2.githubusercontent.com/u/16935616?s=200&v=4',
    breadcrumbs: false,
    dense: false
  },
  navigation: {
    style: 'tabs'
  },
  // search: true,
  datasources: {
    data: {
      id: 'data',
      source: 'content.yml',
      handlers: [
        { processorId: 'webrequest' },
        { processorId: 'yaml' }
      ]
    },
    data_old: {
      id: 'data',
      source: 'result.json',
      handlers: [{
        processorId: 'webrequest'
      }]
    }
  },
  leftSidebar: {
    title: 'Docker Composer',
    open: false,
    permanent: false,
    persistent: true,
    clipped: false,
    temporary: false,
    component: Compose
  },
  theme: {
    colors: {
      primary: '#FDB836',
      secondary: '#e5e9ea',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    }
  },
  footer: {
    enabled: false,
    text: 'Test footer'
  },
  dashboards: [{
    path: '/',
    layout: 'single',
    title: 'Home',
    defaultWidgetOptions: {
      class: 'test'
    },
    widgets: [{ component: Home, content: {} }]
  }]
};

const toContentVM = (items: { [key: string]: IContent }) => {
  for (const key in items) {
    if (!items.hasOwnProperty(key)) { continue; }
    const item = items[key];
    Vue.set(item, 'showParameters', false);
    Vue.set(item, 'isSelected', false);
    Vue.set(item, 'isSelectedByUser', false);
    Vue.set(item, 'dependents', []);
  }
};

app.init(app.project);
app.loadDatasource('data').then((config: IConfig) => {
  if (!app.project.dashboards) { app.project.dashboards = []; }
  app.data = { config } as IState;

  for (const key in config.content) {
    if (!config.content.hasOwnProperty(key)) { continue; }
    const content = config.content[key] || {};
    if (content.items) { toContentVM(content.items); }
    content.id = key;
    app.project.dashboards.push({
      path: `/${content.id}`,
      layout: 'single',
      title: content.id,
      widgets: [{ component: Overview, content }]
    });
  }
});
