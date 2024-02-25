export type NotificationVariant = "info" | "success" | "warning" | "danger" | "default";

export interface NotificationConfig {
  message: string;
  variant: NotificationVariant;
}
