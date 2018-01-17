import { IContent, IContentCategory } from './content';
import { IService } from './service';

export interface IConfig {
    content: {[id:string] : IContentCategory};
    services: {[id:string] : IService};
}