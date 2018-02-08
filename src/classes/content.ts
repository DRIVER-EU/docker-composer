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
  constructor(private content: IContentVM) {
    this.content.dependents = [];
  }

  public get id() {
    return this.content.id;
  }
  public get title() {
    return this.content.title;
  }
  public get description() {
    return this.content.description;
  }
  public get logo() {
    return this.content.logo;
  }
  public get website() {
    return this.content.website;
  }
  public get depends_on() {
    return this.content.depends_on;
  }
  public get services() {
    return this.content.services;
  }
  public get parameters() {
    return this.content.parameters;
  }
  public get isSelected() {
    return this.content.isSelected;
  }
  public set isSelected(val: boolean) {
    this.content.isSelected = val;
  }
  public get isSelectedByUser() {
    return this.content.isSelectedByUser;
  }
  public set isSelectedByUser(val: boolean) {
    this.content.isSelectedByUser = val;
  }
  public get showParameters() {
    return this.content.showParameters;
  }
  public set showParameters(val: boolean) {
    this.content.showParameters = val;
  }
  public get dependents() {
    return this.content.dependents;
  }
  public set dependents(val: string[]) {
    this.content.dependents = val;
  }

  @Watch('isSelectedByUser')
  public get isDisabled() {
    return (
      typeof this.services === 'undefined' || this.services.length === 0 || (this.isSelected && !this.isSelectedByUser)
    );
  }

  public get unavailable() {
    return typeof this.services === 'undefined' || this.services.length === 0;
  }
}
