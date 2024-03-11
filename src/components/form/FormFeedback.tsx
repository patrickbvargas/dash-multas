import React from "react";

interface FormFeedbackProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message: string;
}

const FormFeedback = ({ message = "", className = "", ...props }: FormFeedbackProps) => {
  return (
    <p className="text-red-500 dark:text-red-700" {...props}>
      {message}
    </p>
  );
};

export default FormFeedback;
