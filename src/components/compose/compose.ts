import { IState } from './../../classes/state';
import { IConfig } from './../../classes/config';
import { IContent, IContentVM } from './../../classes/content';
import Component from 'vue-class-component';
import Vue from 'vue';
import * as YAML from 'yamljs';
import './compose.css';
import { AppState } from '@csnext/cs-client';
import { IService } from '../../classes/service';

@Component({
  name: 'compose',
  template: require('./compose.html')
} as any)
export default class Compose extends Vue {
  public url: string = '';
  public yaml: string = 'Please select some components first';
  public dialog = false;

  public constructor() {
    super();
  }

  public createDockerComposeFile() {
    this.dialog = true;
    const state = AppState.Instance.data as IState;
    const serviceIDs: string[] = [];
    const components: IContentVM[] = [];
    const parameters: { [parameter: string]: string | number } = {};
    for (const cKey in state.config.content) {
      if (!state.config.content.hasOwnProperty(cKey)) { continue; }
      const items = state.config.content[cKey].items;
      if (!items) { continue; }
      for (const key in items) {
        if (!items.hasOwnProperty(key)) { continue; }
        const item = items[key] as IContentVM;
        if (!item.isSelected) { continue; }
        components.push(item);
        if (item.parameters) {
          for (const parameter in item.parameters) {
            if (!item.parameters.hasOwnProperty(parameter)) { continue; }
            parameters[parameter] = item.parameters[parameter];
          }
        }
        if (!item.services) { continue; }
        item.services
          .filter(d => serviceIDs.indexOf(d) < 0)
          .forEach(d => serviceIDs.push(d));
      }
    }

    const applyParameters = (yaml: string) => {
      for (const parameter in parameters) {
        if (!parameters.hasOwnProperty(parameter)) { continue; }
        const regex = new RegExp(`\\$${parameter}`, 'gmi');
        yaml = yaml.replace(regex, `${parameters[parameter]}`);
      }
      return yaml;
    };
    console.log('Components');
    console.log(components);
    console.log('Services');
    console.log(serviceIDs);

    const services: IService[] = [];
    for (const key in state.config.services) {
      if (!state.config.services.hasOwnProperty(key) || serviceIDs.indexOf(key) < 0) { continue; }
      services.push(state.config.services[key]);
    }
    const dockerFile = {
      version: '2',
      services: services
    };
    this.yaml = applyParameters(YAML.stringify(dockerFile, 5, 2));
    const blob = new Blob([this.yaml], { type: 'application/text' });
    // const json = JSON.stringify(data);
    // const blob = new Blob([json], { type: 'application/json' });
    this.url = URL.createObjectURL(blob);
  }

  // public mounted() {
  // }

}
