import Vue from 'vue';
import Component from 'vue-class-component';
import * as YAML from 'yamljs';
import { AppState } from '@csnext/cs-client';
import { IState } from './../../classes/state';
import { IContentVM } from './../../classes/content';
import { IService } from '../../classes/service';
import './compose.css';

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

    const services: { [key: string]: IService} = {};
    for (const key in state.config.services) {
      if (!state.config.services.hasOwnProperty(key) || serviceIDs.indexOf(key) < 0) { continue; }
      services[key] = state.config.services[key];
    }
    const dockerFile = {
      version: '3',
      services,
      volumes: {
        // TODO extract named volumes automatically instead of hardcoding
        'postgres-data': undefined
      }
    };
    this.yaml = applyParameters(YAML.stringify(dockerFile, 5, 2));
    const blob = new Blob(['---\n' + this.yaml], { type: 'application/text' });
    this.url = URL.createObjectURL(blob);
  }

  // public mounted() {
  // }

}
