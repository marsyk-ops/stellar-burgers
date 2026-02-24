import { useState, useCallback } from 'react';

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const setValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const reset = useCallback(
    (newValues?: T) => {
      setValues(newValues || initialValues);
    },
    [initialValues]
  );

  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({
      ...prev,
      ...newValues
    }));
  }, []);

  return {
    values,
    handleChange,
    setValue,
    reset,
    setFormValues
  };
}
