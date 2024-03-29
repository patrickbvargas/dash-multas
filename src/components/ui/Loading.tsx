import { cn } from "@utils";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loading = ({ className = "", ...props }: LoadingProps) => {
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <svg
        className="animate-spin"
        height="50"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M93.9676 38.4501C96.393 37.813 97.8624 35.3208 97.0079 32.9631C95.2932 28.2319 92.871 23.7784 89.8167 19.7572C85.8452 14.5284 80.8826 10.133 75.2124 6.82206C69.5422 3.51112 63.2754 1.34943 56.7698 0.460415C51.7666 -0.223279 46.6976 -0.143977 41.7345 0.687907C39.2613 1.10246 37.813 3.60696 38.4501 6.03244V6.03244C39.0873 8.45792 41.5694 9.8809 44.0505 9.51628C47.8511 8.95773 51.7191 8.93607 55.5402 9.45823C60.8642 10.1858 65.9928 11.9548 70.6331 14.6644C75.2734 17.374 79.3347 20.971 82.5849 25.2501C84.9175 28.3212 86.7996 31.7005 88.1811 35.285C89.083 37.625 91.5421 39.0873 93.9676 38.4501V38.4501Z"
          fill="#ba68c8"
        />
      </svg>
    </div>
  );
};

export default Loading;
