import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NgxLivechatConfig, NgxLivechatWindow, NGX_LIVECHAT_CONFIG } from './ngx-livechat';

@Injectable({ providedIn: 'root' })
export class NgxLivechatService {
  liveChatLoaded$: Observable<boolean>;

  private liveChatLoadedSubject: Subject<boolean>;
  private window: NgxLivechatWindow;

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(NGX_LIVECHAT_CONFIG) private config: NgxLivechatConfig) {
    this.window = this.document.defaultView as unknown as NgxLivechatWindow;
    this.liveChatLoadedSubject = new Subject<boolean>();
    this.liveChatLoaded$ = this.liveChatLoadedSubject.asObservable();
  }

  initLiveChat(): void {
    if (!this.window.__lc) {
      this.window.__lc = {
        license: this.config.licenseId,
        group: this.config.group,
        chat_between_groups: this.config.chatBetweenGroups
      };

      const script = this.createHTMLScriptElement('https://cdn.livechatinc.com/tracking.js', true);
      this.document.body.insertBefore(script, this.document.body.firstChild);

      script.addEventListener('load', () => (this.window.LC_API.on_after_load = () => this.liveChatLoadedSubject.next(true)));
      script.addEventListener('error', (error) => console.error(error));
    }
  }

  agentsAreAvailable = (): boolean => this.window.LC_API.agents_are_available();
  chatRunning = (): boolean => this.window.LC_API.chat_running();
  chatWindowHidden = (): boolean => this.window.LC_API.chat_window_hidden();
  chatWindowMaximized = (): boolean => this.window.LC_API.chat_window_maximized();
  chatWindowMinimized = (): boolean => this.window.LC_API.chat_window_minimized();
  closeChat = (): void => this.window.LC_API.close_chat();
  getChatId = (): string => this.window.LC_API.get_chat_id();
  getChatsNumber = (): number => this.window.LC_API.get_chats_number();
  getLastVisitTimestamp = (): Date => this.window.LC_API.get_last_visit_timestamp();
  getPageViewsNumber = (): number => this.window.LC_API.get_page_views_number();
  getVisitorId = (): string => this.window.LC_API.get_visitor_id();
  getVisitsNumber = (): number => this.window.LC_API.get_visits_number();
  hideChatWindow = (): void => this.window.LC_API.hide_chat_window();
  minimizeChatWindow = (): void => this.window.LC_API.minimize_chat_window();
  openChatWindow = (): void => this.window.LC_API.open_chat_window();
  setCustomVariables = (variables: unknown): void => this.window.LC_API.set_custom_variables(variables);
  setVisitorEmail = (email: string): void => this.window.LC_API.set_visitor_email(email);
  setVisitorName = (name: string): void => this.window.LC_API.set_visitor_name(name);
  triggerSalesTracker = (e: unknown, t: unknown): void => this.window.LC_API.trigger_sales_tracker(e, t);
  updateCustomVariables = (variables: unknown): void => this.window.LC_API.update_custom_variables(variables);
  visitorEngaged = (): void => this.window.LC_API.visitor_engaged();
  visitorQueued = (): void => this.window.LC_API.visitor_queued();

  private createHTMLScriptElement(src: string, async?: boolean): HTMLScriptElement {
    const el: HTMLScriptElement = document.createElement('script');
    el.type = 'text/javascript';
    el.src = src;
    el.async = async || false;
    return el;
  }
}
