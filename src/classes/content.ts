export interface IContentCategory {
  id?: string;
  title?: string;
  description?: string;
  logo?: string;
  items?: { [key: string]: IContent }
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
}
