import { InjectionToken } from '@angular/core';

export interface NgxLivechatConfig {
  license: number;
  group?: number;
  chatBetweenGroups?: boolean;
  params?: { name: string; value: string }[];
  visitor?: { name: string; email: string };
  gaVersion?: 'ga' | 'gtm' | 'gtag' | 'gaq';
  initManually?: boolean;
}

export const NGX_LIVECHAT_CONFIG = new InjectionToken<NgxLivechatConfig>('NGX_LIVECHAT_CONFIG');

export interface NgxLiveChat {
  /**
   * LiveChat license number
   */
  license: number;

  /**
   * Chat window group (defaults to "0").
   * You can divide LiveChat agents into different departments,
   * such as "Billing" or "Support".
   * For example, if this parameter will point to group "Billing",
   * all visitors entering the chat will talk with agents
   * from this group and not the "Support" group.
   *
   * Create your group in LiveChat app:
   * https://my.livechatinc.com/agents/groups
   */
  group?: number;

  /**
   * By default, visitor's browsing history is remembered
   * across different groups.
   *
   * If you don't want to display visitor's browsing history
   * across different groups, use the following code.
   *
   * Using this parameter is not recommended when
   * using target field in the pre-chat survey.
   */
  chat_between_groups?: boolean;

  /**
   * Custom variables sent to LiveChat applications.
   * These can be your visitor's account ID, login
   * or any other information that is important for
   * LiveChat agent during the chat.
   *
   * "name"  can be max 500 characters long.
   * "value" can be max 3500 characters long.
   */
  params?: { name: string; value: string }[];

  /**
   * Visitor's data. If your visitor is already logged in
   * to your system, you can pass his name and e-mail to LiveChat apps.
   * Agents will see the information on the "Visitors" list
   * and in the Archives.
   */
  visitor?: { name: string; email: string };

  /**
   * By default, our tracking code strores LiveChat related data
   * in the Google Analytics gaq - traditional asynchronous
   * code for Google Analytics.
   *
   * If you are using a different type of Google Analytics,
   * you can decide which one LiveChat should track.
   *
   * The available options are:
   * ga – Universal Analytics;
   * gtm – Google Tag Manager;
   * gtag – Global Site Tag (gtag.js);
   * gaq – traditional asynchronous code for Google Analytics.
   */
  ga_version?: 'ga' | 'gtm' | 'gtag' | 'gaq';
}

export interface NgxLiveChatApi {
  agents_are_available(): boolean;
  chat_running(): boolean;
  chat_window_hidden(): boolean;
  chat_window_maximized(): boolean;
  chat_window_minimized(): boolean;
  close_chat(): void;
  get_chat_id(): string;
  get_chats_number(): number;
  get_last_visit_timestamp(): Date;
  get_page_views_number(): number;
  get_visitor_id(): string;
  get_visits_number(): number;
  hide_chat_window(): void;
  minimize_chat_window(): void;
  on_after_load(): void;
  on_before_load(): void;
  on_chat_ended(): void;
  on_chat_started(data: unknown): void;
  on_chat_state_changed(data: unknown): void;
  on_chat_window_hidden(): void;
  on_chat_window_minimized(): void;
  on_chat_window_opened(): void;
  on_message(data: unknown): void;
  on_postchat_survey_submitted(data: unknown): void;
  on_prechat_survey_submitted(data: unknown): void;
  on_rating_comment_submitted(data: unknown): void;
  on_rating_submitted(data: unknown): void;
  on_ticket_created(data: unknown): void;
  on_widget_resize(): void;
  open_chat_window(): void;
  set_custom_variables(variables: unknown): void;
  set_visitor_email(email: string): void;
  set_visitor_name(name: string): void;
  trigger_sales_tracker(e: unknown, t: unknown): void;
  update_custom_variables(variables: unknown): void;
  visitor_engaged(): void;
  visitor_queued(): void;
}

export interface NgxLivechatWindow extends Window {
  LiveChatWidget: unknown;
  LC_API: NgxLiveChatApi;
  __lc: NgxLiveChat;
}
