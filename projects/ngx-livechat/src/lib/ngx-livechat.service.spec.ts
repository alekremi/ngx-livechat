import { TestBed } from '@angular/core/testing';

import { NgxLivechatModule } from './ngx-livechat.module';
import { NgxLivechatService } from './ngx-livechat.service';

describe('NgxLivechatService', () => {
  let service: NgxLivechatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxLivechatModule.forRoot({ licenseId: 11082047 })]
    });
    service = TestBed.inject(NgxLivechatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
