import axios from 'axios';
import {
  IDatasource,
  IDatasourceProcessor,
  ProcessorActions
} from '@csnext/cs-core';
import * as YAML from 'yamljs';

export class YamlDatasourceProcessor implements IDatasourceProcessor {
  public id = 'yaml';
  public data: any;

  constructor(public file: string) {}

  public execute(
    {},
    ds: IDatasource,
    action?: ProcessorActions,
    data: string = ''
  ) {
    return new Promise<object>((resolve, reject) => {
      axios
        .get(this.file)
        .then(d => {
          const json = YAML.parse(d.data);
          this.data = json;
          resolve(json);
        })
        .catch(e => {
          reject('No source defined');
        });
    });
  }
}
