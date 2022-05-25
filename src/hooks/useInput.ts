import { useEffect, useState } from "react";

const useInput = (initialValue: string | number | undefined) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => setValue(initialValue), [initialValue]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const reset = () => setValue("");

  return {
    value,
    onChange: handleChange,
    reset,
  };
};

export default useInput;
