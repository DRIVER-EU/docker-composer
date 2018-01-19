import { IDatasource, IDatasourceProcessor, ProcessorActions } from '@csnext/cs-core';
import * as YAML from 'yamljs';
import { DatasourceManager } from '@csnext/cs-client';

export class YamlDatasourceProcessor implements IDatasourceProcessor {
  public id = 'yaml';

  public execute(ds: IDatasource, action?: ProcessorActions, data: string = '') {
    return new Promise<Object>((resolve, reject) => {
      if (ds.source === undefined) { return reject('No source defined'); }
      const json = YAML.parse(data);
      ds.data = json;
      resolve(json);
    });
  }
}

DatasourceManager.add(new YamlDatasourceProcessor());
