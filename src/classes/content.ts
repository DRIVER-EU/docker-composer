import { Watch } from 'vue-property-decorator';

export interface IContentCategory {
  id?: string;
  title?: string;
  description?: string;
  logo?: string;
  items?: { [key: string]: IContent };
}

/** Content item to show in the GUI */
export interface IContent {
  id?: string;
  title?: string;
  description?: string;
  logo?: string;
  website?: string;
  /**
   * List of (ID's of) other content items it depends on, i.e. they should be
   * included in the docker compose file too.
   */
  depends_on?: string[];
  /** List of docker image IDs that are required to run this item */
  services?: string[];
  /** Specific Docker parameters that can be set in the GUI. */
  parameters?: { [key: string]: string };
}

/** View model version that contains extra parameters */
export interface IContentVM extends IContent {
  /** Is the component selected - maybe not directly by the user, but indirectly, due to a dependency. */
  isSelected: boolean;
  /** Did the user select the component. */
  isSelectedByUser: boolean;
  /** Who depends on this component */
  dependents: string[];
  /** If true, open the parameter GUI */
  showParameters: boolean;
  /** If true, the component cannot be selected */
  isDisabled: boolean;
}

export class ContentVM implements IContentVM {
  public id?: string;
  public title?: string;
  public description?: string;
  public logo?: string;
  public website?: string;
  // tslint:disable-next-line:variable-name
  public depends_on?: string[];
  public services?: string[];
  public parameters?: { [key: string]: string };
  public isSelected = false;
  public isSelectedByUser = false;
  public showParameters = false;
  public dependents: string[] = [];

  constructor(content: IContent) {
    this.id = content.id;
    this.title = content.title;
    this.description = content.description;
    this.logo = content.logo;
    this.website = content.id;
    this.depends_on = content.depends_on;
    this.services = content.services;
    this.parameters = content.parameters;
  }

  @Watch('isSelectedByUser')
  public get isDisabled() {
    return (
      typeof this.services === 'undefined' ||
      this.services.length === 0 ||
      (this.isSelected && !this.isSelectedByUser)
    );
  }
}
