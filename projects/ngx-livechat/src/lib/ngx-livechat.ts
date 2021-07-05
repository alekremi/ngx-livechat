import { InjectionToken } from '@angular/core';

export interface NgxLivechatConfig {
  licenseId: number;
  group?: number;
  chatBetweenGroups?: boolean;
}

export const NGX_LIVECHAT_CONFIG = new InjectionToken<NgxLivechatConfig>('NGX_LIVECHAT_CONFIG');

export interface NgxLiveChat {
  license: number;
  group?: number;
  chat_between_groups?: boolean;
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
