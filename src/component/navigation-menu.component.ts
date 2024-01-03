import { Output, EventEmitter, Component } from '@angular/core';

@Component({
  selector: 'navigation-menu',
  //standalone: true,
  //imports: [],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
  @Output() navigationPanEvent = new EventEmitter();

  panButtonClicked() {
    this.navigationPanEvent.emit();
  }
}
