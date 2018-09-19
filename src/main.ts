import Vue from 'vue';
import { CsApp, AppState } from '@csnext/cs-client';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);
import { project } from './composer';
import { IState } from './classes/state';
import { IConfig } from './classes/config';
import { IContent } from './classes/content';
import Overview from './components/overview/overview';

Vue.config.productionTip = false;
const app = AppState.Instance;

new Vue({
  render: h => h(CsApp)
}).$mount('#app');

AppState.Instance.init(project);

AppState.Instance.loadDatasource<any>('data').then((config: IConfig) => {
  if (!app.project.dashboards) {
    app.project.dashboards = [];
  }
  app.data = { config } as IState;

  for (const key in config.content) {
    if (!config.content.hasOwnProperty(key)) {
      continue;
    }
    const content = config.content[key] || {};
    if (content.items) {
      toContentVM(content.items);
    }
    content.id = key;
    app.project.dashboards.push({
      path: `/${content.id}`,
      layout: 'single',
      title: content.id,
      widgets: [{ component: Overview, content }]
    });
  }
});

const toContentVM = (items: { [key: string]: IContent }) => {
  for (const key in items) {
    if (!items.hasOwnProperty(key)) {
      continue;
    }
    const item = items[key];
    Vue.set(item, 'showParameters', false);
    Vue.set(item, 'isSelected', false);
    Vue.set(item, 'isSelectedByUser', false);
    Vue.set(item, 'dependents', []);
  }
};

(window as any).app = AppState.Instance;
