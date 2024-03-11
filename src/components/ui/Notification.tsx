import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@utils";
import { XMarkIcon } from "@icons/mini";
import { NotificationProps } from "@types";
import { useNotificationContext } from "@hooks";
import { NOTIFICATION_TIME_IN_SECONDS } from "@constants";

const notificationVariants = cva(
  "absolute right-2 left-2 top-8 w-max-full flex items-center gap-2 rounded-md px-4 py-3 shadow-md ring-1 transition-opacity duration-500 dark:shadow-none sm:right-8 sm:top:8 sm:left-auto z-50",
  {
    variants: {
      variant: {
        success:
          "bg-emerald-100 text-emerald-950 ring-emerald-300 dark:bg-emerald-800 dark:text-emerald-100 dark:ring-emerald-600",
        warning:
          "bg-yellow-100 text-yellow-950 ring-yellow-300 dark:bg-yellow-800 dark:text-yellow-100 dark:ring-yellow-600",
        danger:
          "bg-rose-100 text-rose-950 ring-rose-300 dark:bg-rose-800 dark:text-rose-100 dark:ring-rose-600",
        info: "bg-sky-100 text-sky-950 ring-sky-300 dark:bg-sky-800 dark:text-sky-100 dark:ring-sky-600",
        default:
          "bg-neutral-100 text-neutral-950 ring-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:ring-neutral-600",
      },
    },
  },
);

const Notification = ({ message = "", variant = "default" }: NotificationProps) => {
  const { hideNotification } = useNotificationContext();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, NOTIFICATION_TIME_IN_SECONDS * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      hideNotification();
    }, 500);
  };

  return (
    <div
      className={cn(
        notificationVariants({ variant: variant }),
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <p className="text-sm">{message}</p>
      <XMarkIcon className="hidden h-5 cursor-pointer hover:animate-pulse sm:block" onClick={handleClose} />
    </div>
  );
};

export default Notification;
