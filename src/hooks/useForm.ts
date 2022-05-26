import { useCallback, useEffect, useRef, useState } from "react";

const useForm = ({ fields, editValuePresent, onSubmit }: FormProps) => {
  const [, forceUpdate] = useState(Date.now());

  const _update = useCallback(() => forceUpdate(Date.now()), []);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const {
        currentTarget: { id, value },
      } = event;
      const field: InternalField = form.current.fields[id];
      field.value = value;
      if (!isValid(field)) {
        invalidate(field);
      } else {
        validate(field);
      }
      _update();
    },
    [_update]
  );
  const initialize = useCallback(
    (vals: any) => {
      const form: Form = { valid: false, invalidFields: [], fields: [] };
      for (let field of vals) {
        form.fields[field.id] = {
          ...field,
          value: field.value ? field.value : "",
          valid: true,
          onChange: handleChange,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        field.required ? form.invalidFields.push(field.id) : null;
      }
      return form;
    },
    [handleChange]
  );

  const form = useRef<Form>(initialize(fields));

  const submit = useCallback(() => onSubmit(form.current), [onSubmit]);

  const isValid = (field: InternalField) => {
    if (
      field.required &&
      (!field.value || field.value === "" || field.value === 0)
    )
      return false;
    return true;
  };

  const invalidate = (field: InternalField) => {
    field.valid = false;
    form.current.invalidFields.push(field.id);
    form.current.valid = false;
  };

  const validate = (field: InternalField) => {
    field.valid = true;
    form.current.invalidFields = form.current.invalidFields.filter(
      (f: string) => f !== field.id
    );
    if (form.current.invalidFields.length <= 0) form.current.valid = true;
  };

  const reset = useCallback(() => {
    for (let field of form.current.fields) {
      form.current.fields[field.id] = {
        ...field,
        value: "",
        valid: true,
        onChange: handleChange,
      };
      form.current.invalidFields.push(field.id);
      form.current.valid = false;
    }
  }, [handleChange]);

  useEffect(() => {
    if (editValuePresent === true) {
      form.current = initialize(fields);
      form.current.valid = true;
      _update();
    }
  }, [editValuePresent, initialize]);

  return {
    ...form.current.fields,
    submit,
    handleChange,
    reset,
    valid: form.current.valid,
  };
};

interface Field {
  id: string;
  required: boolean;
  type: string;
  placeholder?: string;
  value?: string | number;
}

interface InternalField extends Field {
  value: string | number;
  valid: boolean;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

interface FormProps {
  onSubmit: (input: any) => any;
  fields: Field[];
  editValuePresent?: boolean;
}

interface Form {
  valid: boolean;
  invalidFields: string[];
  fields: any;
}

export default useForm;
