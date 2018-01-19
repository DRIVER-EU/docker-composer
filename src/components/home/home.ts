import Component from 'vue-class-component';
import { WidgetBase } from '@csnext/cs-client';
import './home.css';

@Component({
  name: 'home',
  template: require('./home.html')
} as any)
export default class Home extends WidgetBase {
  public UpdateContent(content: string) {}

  public mounted() {
    if (this.widget && this.widget.content) {
      this.UpdateContent(this.widget.content);
    }
  }

}
