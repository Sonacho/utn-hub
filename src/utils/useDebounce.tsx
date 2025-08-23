import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debauncedValue, setDebauncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebauncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debauncedValue;
};

export default useDebounce;
