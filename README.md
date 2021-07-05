## Library to integrate [Livechat](https://www.livechat.com/) with Angular

#### Demo

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
  imports: [BrowserModule, NgxLivechatModule.forRoot({ licenseId: 11082047 })],
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

### Configuration

Required parameter:

- `licenseId`

As optional parameters, you can define:

- `group`
- `chatBetweenGroups`
- `params`
- `visitor`
- `gaVersion`
