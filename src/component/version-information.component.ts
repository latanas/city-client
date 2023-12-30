import { Component } from '@angular/core';
import packageJson from '../../package.json';

@Component({
  selector: 'version-information',
  //standalone: true,
  //imports: [],
  templateUrl: './version-information.component.html',
  styleUrl: './version-information.component.scss'
})
export class VersionInformationComponent {
  appVersion = packageJson.version;
}
