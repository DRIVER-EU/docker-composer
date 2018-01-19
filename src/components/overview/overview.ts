import { IContentVM, IContentCategory } from './../../classes/content';
import Component from 'vue-class-component';
import { WidgetBase, AppState } from '@csnext/cs-client';
import './overview.css';
import { IState } from '../../classes/state';

@Component({
  name: 'overview',
  template: require('./overview.html')
} as any)
export default class Overview extends WidgetBase {
  public category: IContentCategory = {};

  public UpdateContent(n: IContentCategory) {
    if (!n) { return; }
    this.category = n;
  }

  public mounted() {
    if (this.widget && this.widget.content) {
      this.UpdateContent(this.widget.content);
    }
  }

  public toggleSelection(item: IContentVM) {
    item.isSelectedByUser = item.isSelected;
    if (!item.depends_on || item.depends_on.length === 0) { return; }
    const state = AppState.Instance.data as IState;
    for (const categoryId in state.config.content) {
      if (!state.config.content.hasOwnProperty(categoryId)) { continue; }
      const category = state.config.content[categoryId];
      if (!category.items) { continue; }
      for (const itemId in category.items) {
        if (!category.items.hasOwnProperty(itemId) || item.depends_on.indexOf(itemId) < 0) { continue; }
        const di = category.items[itemId] as IContentVM;
        if (item.isSelected) {
          di.isSelected = true;
          di.dependents.push(item.id || '');
        } else {
          const i = di.dependents.indexOf(item.id || '');
          if (i >= 0) { di.dependents.splice(i, 1); }
          if (di.isSelectedByUser === false && di.dependents.length === 0) { di.isSelected = false; }
        }
      }
    }
  }
}
