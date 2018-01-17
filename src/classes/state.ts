import { IContentVM } from './content';
import { IConfig } from './config';

/** Specifies the application state data model */
export interface IState {
  /** Original configuration file */
  config: IConfig;
  /** Selected components */
  components: IContentVM[];
}
