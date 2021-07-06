import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { NgxLivechatService } from './ngx-livechat.service';
import { NgxLivechatConfig, NGX_LIVECHAT_CONFIG } from './ngx-livechat';

@NgModule({})
export class NgxLivechatModule {
  constructor(@Optional() @SkipSelf() parentModule: NgxLivechatModule) {
    if (parentModule) {
      throw new Error('NgxLivechatModule is already loaded, import it only once.');
    }
  }

  static forRoot(config: NgxLivechatConfig): ModuleWithProviders<NgxLivechatModule> {
    const moduleWithProviders: ModuleWithProviders<NgxLivechatModule> = {
      ngModule: NgxLivechatModule,
      providers: [{ provide: NGX_LIVECHAT_CONFIG, useValue: config }]
    };
    if (!config.initManually) {
      moduleWithProviders.providers?.push({
        provide: APP_INITIALIZER,
        useFactory: (service: NgxLivechatService) => () => service.initLiveChat(),
        deps: [NgxLivechatService],
        multi: true
      });
    }
    return moduleWithProviders;
  }
}
