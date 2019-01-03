import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, flatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';



@Injectable({
  providedIn: 'root'
})
export class AppTitleService {

  sub: Subscription;
  appName: string;

  constructor(private titleService: Title, private router: Router) {
    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(_ => this.router.routerState.root),
      map(route => {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
      }),
      flatMap(route => route.data))
      .subscribe(data => {
        let title = data['title'];
        if (title) {
          const fragment = this.router.url.split('#')[1];
          if (fragment) {
            title += ' | ' + this.toTitleCase(fragment);
          }
        }
        if (title && this.appName) {
            title += ' - ' + this.appName;
        } else if (this.appName) {
            title = this.appName;
        }
        if (title) {
            this.titleService.setTitle(title);
        }
      });
  }
  public toTitleCase(text: string) {
    return text.replace(/\w\S*/g, (subString) => {
        return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
    });
}
}
