import { Component } from '@angular/core';
import { AppTitleService } from './core/services/app-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'angular-starter';
  constructor(private appTitleService: AppTitleService) {
    this.appTitleService.appName = this.title;
  }
}
