## Library to integrate [Livechat](https://www.livechat.com/) with Angular

[![npm version](https://badge.fury.io/js/%40alekremi%2Fngx-livechat.svg)](https://badge.fury.io/js/%40alekremi%2Fngx-livechat)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@alekremi/ngx-livechat)
![Depfu](https://img.shields.io/depfu/alekremi/ngx-livechat)

### Demo

StackBlitz [live example](https://stackblitz.com/edit/ngx-livechat-example).

### Installation

```bash
npm install --save @alekremi/ngx-livechat
```

### Usage

Import `NgxLivechatModule` in Angular AppModule.

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLivechatModule } from 'ngx-livechat';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, NgxLivechatModule.forRoot({ license: 11082047 })],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

The `NgxLivechatService` also provides methods for LiveChat APIs, such as:

- `open_chat_window`
- `minimize_chat_window` and etc.

For example, how to programmatically open a LiveChat window:

```javascript
constructor(private livechatService: NgxLivechatService) {}

openChatWindow(): void {
    this.livechatService.openChatWindow();
}

```

### Advanced usage

Using external configuration

For example your external configuration looks like:

```javascript
interface ExternalConfig {
  liveChatLicense: number;
  //...any other params
}
```

First, we have to set manual initialization flag and specify any license number (for example, 0, this license number will be overwritten when the API service returns the external configuration).

```javascript
NgxLivechatModule.forRoot({ license: 0, initManually: true });
```

app.module.ts example:

```javascript
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgxLivechatModule, NgxLivechatConfig, NGX_LIVECHAT_CONFIG } from '@alekremi/ngx-livechat';

import { AppComponent } from './app.component';

export function liveChatConfigFactory(httpClient: HttpClient, config: NgxLivechatConfig) {
  return (): Promise<ExternalConfig> =>
    httpClient.get <
    ExternalConfig >
    'YOUR_API_URL'.pipe(tap((externalConfig) => (config.license = externalConfig.liveChatLicense))).toPromise();
}

@NgModule({
  imports: [BrowserModule, HttpClientModule, NgxLivechatModule.forRoot({ license: 0, initManually: true })],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: liveChatConfigFactory,
      deps: [HttpClient, NGX_LIVECHAT_CONFIG],
      multi: true
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Then initialize LiveChat mannualy for example in app.component.ts:

```javascript
import { Component, OnInit } from '@angular/core';
import { NgxLivechatService } from '@alekremi/ngx-livechat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private livechatService: NgxLivechatService) {}

  ngOnInit(): void {
    this.livechatService.initLiveChat();
  }
}
```

### Configuration

| Parameter         | Optional | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| license           | No       | LiveChat license number.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| group             | Yes      | Chat window group (defaults to "0"). You can divide LiveChat agents into different departments, such as "Billing" or "Support". <br>For example, if this parameter will point to group "Billing", all visitors entering the chat will talk with agents from this group and not the "Support" group. groups                                                                                                                                                    |
| chatBetweenGroups | Yes      | By default, visitor's browsing history is remembered across different groups. <br><br> If you don't want to display visitor's browsing history across different groups, use the following code. <br><br>Using this parameter is not recommended when using target field in the pre-chat survey.                                                                                                                                                               |
| params            | Yes      | Custom variables sent to LiveChat applications.<br>These can be your visitor's account ID, login or any other information that is important for LiveChat agent during the chat. <br><br>"name" can be max 500 characters long.<br>"value" can be max 3500 characters long.                                                                                                                                                                                    |
| visitor           | Yes      | Visitor's data. If your visitor is already logged in to your system, you can pass his name and e-mail to LiveChat apps.<br>Agents will see the information on the "Visitors" list and in the Archives.                                                                                                                                                                                                                                                        |
| gaVersion         | Yes      | By default, our tracking code strores LiveChat related data in the Google Analytics gaq - traditional asynchronous code for Google Analytics.<br><br>If you are using a different type of Google Analytics, you can decide which one LiveChat should track.<br><br>The available options are: <br>ga – Universal Analytics;<br> gtm – Google Tag Manager;<br> gtag – Global Site Tag (gtag.js);<br> gaq – traditional asynchronous code for Google Analytics. |
| initManually      | Yes      | The parameter determines whether LiveChat will be manually initialized. By default, it is initialized when the application starts.                                                                                                                                                                                                                                                                                                                            |
