import Compose from './components/compose/compose';
import Home from './components/home/home';
import { IProject } from '@csnext/cs-core';
import './assets/example.css';
import { YamlDatasourceProcessor } from './datasources/yaml-datasource-processor';

export const project: IProject = {
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
    data: new YamlDatasourceProcessor('content.yml'),
    data_old: {
      id: 'data',
      source: 'result.json',
      handlers: [
        {
          processorId: 'webrequest'
        }
      ]
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
    visible: false,
    text: 'Test footer'
  },
  dashboards: [
    {
      path: '/',
      layout: 'single',
      title: 'Home',
      defaultWidgetOptions: {
        class: 'test'
      },
      widgets: [{ component: Home, content: {} }]
    }
  ]
};
