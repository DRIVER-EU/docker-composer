import { IDatasource, IDatasourceHandler, IDatasourceProcessor, ProcessorActions } from '@csnext/cs-core';
import * as YAML from 'yamljs';
import axios from 'axios';
import { WebRequestDatasourceProcessor, DatasourceManager } from '@csnext/cs-client';

// NOTE When including yamljs with Webpack, add the following to your webpack.config.js,
// otherwise it starts whining about missing 'fs' module:
// node: {
//   fs: "empty"
// }

export class YamlDatasourceProcessor implements IDatasourceProcessor {
  public id = 'yaml';

  public execute(ds: IDatasource, action?: ProcessorActions, data: string = '') {
    return new Promise<Object>((resolve, reject) => {
      if (ds.source === undefined) { return reject('No source defined'); }
      const json = YAML.parse(data);
      ds.data = json;
      console.log(json);
      resolve(json);
    });
  }
}

DatasourceManager.add(new YamlDatasourceProcessor());
