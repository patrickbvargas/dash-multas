import React from "react";

interface TitleOutput {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export function usePageTitle(pageTitle: string): TitleOutput {
  const [title, setTitle] = React.useState(pageTitle);

  React.useEffect(() => {
    setTitle(pageTitle);
  }, [pageTitle]);

  return { title, setTitle };
}
