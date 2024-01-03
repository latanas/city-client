import { Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
  selector: 'navigation-menu',
  //standalone: true,
  //imports: [],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
  @Input() navigationPanEnabled = false;
  @Output() navigationPanEvent = new EventEmitter();

  panButtonClicked() {
    this.navigationPanEvent.emit();
  }
}
