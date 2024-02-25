import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@utils";
import { useAppContext } from "@contexts";
import { XMarkIcon } from "@icons/mini";

const NOTIFICATION_TIME_IN_SECONDS = 5;

const notificationBannerVariants = cva(
  "absolute right-2 left-2 top-8 w-max-full flex items-center gap-2 rounded-md px-4 py-3 shadow-md ring-1 transition-opacity duration-500 dark:shadow-none sm:right-8 sm:top:8 sm:left-auto",
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

interface NotificationBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

const NotificationBanner = ({ className = "", ...props }: NotificationBannerProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { notificationConfig, setNotificationConfig } = useAppContext();

  React.useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, NOTIFICATION_TIME_IN_SECONDS * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [notificationConfig]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setNotificationConfig({ message: "", variant: "default" });
    }, 500);
  };

  return (
    notificationConfig.message && (
      <div
        className={cn(
          notificationBannerVariants({ variant: notificationConfig.variant }),
          isVisible ? "opacity-100" : "pointer-events-none opacity-0",
          className,
        )}
        {...props}
      >
        <p className="text-sm">{notificationConfig.message}</p>
        <XMarkIcon className="hidden h-5 cursor-pointer hover:animate-pulse sm:block" onClick={handleClose} />
      </div>
    )
  );
};

export default NotificationBanner;
