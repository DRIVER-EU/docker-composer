import { IConfig } from './../../classes/config';
import { IContent } from './../../classes/content';
import Component from 'vue-class-component';
import Vue from 'vue';
import * as YAML from 'yamljs';
import './compose.css';
import { AppState } from '@csnext/cs-client';

@Component({
  name: 'compose',
  template: require('./compose.html')
} as any)
export default class Compose extends Vue {
  public url: string = '';
  private state?: {
    config: IConfig;
    components: IContent[];
  };

  public constructor() {
    super();
  }
  // public UpdateContent(content: string) { }

  public prepareDownload() {
    const app = AppState.Instance;
    this.state = app.data as { config: IConfig; components: IContent[]; };
    if (this.state && this.state.components) {
      console.log('Components');
      console.log(this.state.components);
      const data = this.state.components;
      const dockerFile = {
        version: '2',
        services: this.state.config.services
      }
      const yaml = YAML.stringify(dockerFile);
      const blob = new Blob([yaml], { type: 'application/text' });
      // const json = JSON.stringify(data);
      // const blob = new Blob([json], { type: 'application/json' });
      this.url = URL.createObjectURL(blob);
    }
  }

  // public mounted() {
  // }

}
