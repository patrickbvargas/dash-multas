import React from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  };

  const [value, setValue] = React.useState<T>(getValue());

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
