import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { AuthserviceService } from './authservice.service';

@Component({
  selector: 'app-root', 
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Admin Panel SNF ';
  
  constructor(
    private authService:AuthserviceService,
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  // ngOnInit(): void {
  //   this.router.events.subscribe((evt) => {
  //     if (!(evt instanceof NavigationEnd)) {
  //       return;
  //     }
  //   });
  // }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/logout') {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
  

