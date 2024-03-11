type NotificationVariant = "info" | "success" | "warning" | "danger" | "default";

export interface NotificationProps {
  message: string;
  variant: NotificationVariant;
}
