import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxLivechatConfig, NGX_LIVECHAT_CONFIG } from './ngx-livechat';
import { NgxLivechatService } from './ngx-livechat.service';

@NgModule({})
export class NgxLivechatModule {
  constructor(@Optional() @SkipSelf() parentModule: NgxLivechatModule) {
    if (parentModule) {
      throw new Error('NgxLivechatModule is already loaded, import it only once.');
    }
  }

  static forRoot(config: NgxLivechatConfig): ModuleWithProviders<NgxLivechatModule> {
    return {
      ngModule: NgxLivechatModule,
      providers: [
        { provide: NGX_LIVECHAT_CONFIG, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: (service: NgxLivechatService) => () => service.initLiveChat(),
          deps: [NgxLivechatService],
          multi: true
        }
      ]
    };
  }
}
