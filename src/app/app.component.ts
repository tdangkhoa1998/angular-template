import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { I18nService } from './i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isHideSideBar: boolean = false;
  isHideHeader: boolean = false;
  isAuthPage: boolean = false;
  pageTitle: string = '';

  constructor(
    private translateService: TranslateService,
    private i18nService: I18nService,
    private router: Router,
    private titleService: Title,) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // Setup translations
    this.i18nService.init(this.translateService.getBrowserLang(), ['en', 'vi']);

    this.router.events.subscribe((event) => {
      if (event instanceof ActivationStart) {
        if (event.snapshot.outlet == 'primary') {
          let data = event.snapshot.data;
          if (_.isEmpty(data)) {
            if (data['pageTitle']) {
              this.translateService.get(data['pageTitle']).subscribe((title) => {
                this.titleService.setTitle(title);
              });
              this.pageTitle = data['pageTitle'];
            }
            this.isHideHeader = data?.isHideHeader || false;
            this.isHideSideBar = data?.isHideSideBar || false;
            this.isAuthPage = data?.isAuthPage || false;
          }
        }
      }
    });


  }
}
